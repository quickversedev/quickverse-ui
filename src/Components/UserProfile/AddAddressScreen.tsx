import React, {useState, useEffect, useCallback, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  // Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// @ts-expect-error: TypeScript declaration for @env
import {OLA_MAPS_API_KEY} from '@env';

import {AddressStackParamList} from './AddressScreen';
import OlaPlaceAutocomplete from '../OlaPlaceAutocomplete';
import {throttle} from 'lodash';

const COLORS = {
  backgroundPrimary: '#FAEA7B',
  backgroundSecondary: '#FFF9E6',
  textPrimary: '#4A4A4A',
  textSecondary: '#757575',
  buttonBackground: '#8F1413',
  buttonText: '#FFFFFF',
  border: '#E0B84C',
  iconDefault: '#4A4A4A',
  mapPlaceholder: '#E0E0E0',
};

type SelectLocationScreenNavigationProp = StackNavigationProp<
  AddressStackParamList,
  'AddAddressScreen2'
>;

const AddAddressScreen: React.FC = () => {
  const navigation = useNavigation<SelectLocationScreenNavigationProp>();
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] =
    useState(false);

  const requestLocationPermission = async (): Promise<boolean> => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    if (!permission) {
      return false;
    }

    try {
      let status = await check(permission);
      if (status === RESULTS.GRANTED) {
        setIsLocationPermissionGranted(true);
        return true;
      }
      if (status === RESULTS.DENIED) {
        status = await request(permission);
        if (status === RESULTS.GRANTED) {
          setIsLocationPermissionGranted(true);
          return true;
        }
      }
      setIsLocationPermissionGranted(false);
      return false;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  useEffect(() => {
    const fetchInitialLocation = async () => {
      setIsInitialLoading(true);
      const hasPermission = await requestLocationPermission();

      const fallbackToDefaultLocation = () => {
        setMapRegion({
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 15,
          longitudeDelta: 15,
        });
        setIsInitialLoading(false);
        setTimeout(() => {
          isProgrammaticMove.current = false;
        }, 100);
      };

      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            const initialRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.004,
            };

            setMapRegion(initialRegion);

            setIsInitialLoading(false);
            setTimeout(() => {
              isProgrammaticMove.current = false;
            }, 100);
          },
          error => {
            console.error('Error Getting Location:', error.message);
            fallbackToDefaultLocation();
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        fallbackToDefaultLocation();
      }
    };

    fetchInitialLocation();
  }, []);
  const isProgrammaticMove = useRef(false);
  const lastRegionRef = useRef<Region | null>(null);

  const throttledRegionChange = useRef(
    throttle((newRegion: Region) => {
      if (
        !lastRegionRef.current ||
        Math.abs(newRegion.latitude - lastRegionRef.current.latitude) >
          0.0001 ||
        Math.abs(newRegion.longitude - lastRegionRef.current.longitude) > 0.0001
      ) {
        lastRegionRef.current = newRegion;
        setMapRegion(newRegion);
      }
    }, 500),
  ).current;

  const onRegionChangeComplete = useCallback(
    (newRegion: Region) => {
      if (!isProgrammaticMove.current) {
        throttledRegionChange(newRegion);
      }
    },
    [throttledRegionChange],
  );

  const handleSuggestionPress = useCallback((place: any) => {
    const {lat, lng} = place.geometry.location;
    isProgrammaticMove.current = true;
    setMapRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.004,
    });

    setTimeout(() => {
      isProgrammaticMove.current = false;
    }, 100);
  }, []);

  const handleConfirmLocation = useCallback(() => {
    if (!mapRegion) {
      Alert.alert('Error', 'Please select a location on the map.');
      return;
    }
    navigation.navigate('AddAddressScreen2', {
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
    });
  }, [mapRegion, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.backgroundPrimary}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={26} color={COLORS.iconDefault} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Delivery Location</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        {mapRegion?.latitude && (
          <OlaPlaceAutocomplete
            apiKey={OLA_MAPS_API_KEY}
            onPlaceSelected={handleSuggestionPress}
            placeholder="Search for area, street name..."
            latitude={mapRegion?.latitude}
            longitude={mapRegion?.longitude}
          />
        )}
        <View style={styles.mapContainer}>
          {isInitialLoading || !mapRegion ? (
            <ActivityIndicator size="large" color={COLORS.buttonBackground} />
          ) : (
            <>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapView}
                region={mapRegion}
                onRegionChangeComplete={onRegionChangeComplete}
                showsUserLocation={isLocationPermissionGranted}
              />
              <View style={styles.mapCenterMarkerContainer}>
                <Icon name="pin" size={34} color={COLORS.buttonBackground} />
              </View>
            </>
          )}
        </View>
        <Text style={styles.mapInstruction}>Move the map to set your pin</Text>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}>
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: COLORS.backgroundPrimary},
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: COLORS.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {padding: 5},
  headerTitle: {fontSize: 18, fontWeight: '600', color: COLORS.textPrimary},
  backButtonPlaceholder: {width: 40},
  mapContainer: {
    flex: 1, // Let the map take all available space
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mapPlaceholder,
  },
  mapView: {...StyleSheet.absoluteFillObject},
  mapCenterMarkerContainer: {
    // This view is conceptual and doesn't need styles if its parent centers it
  },
  mapInstruction: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.backgroundSecondary,
  },
  confirmButton: {
    backgroundColor: COLORS.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;
