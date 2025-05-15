import React, {useState, useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// --- Geolocation and Permissions for RN CLI ---
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// --- End Geolocation and Permissions ---

import {AppDispatch, RootState} from '../../store/store';
import {addUserAddress, ApiAddress} from '../../services/userAddressSlice';
import {useAuth} from '../../utils/AuthContext';
import {AddressStackParamList} from './AddressListScreen';

const COLORS = {
  /* ... your COLORS object ... */ backgroundPrimary: '#FAEA7B',
  backgroundSecondary: '#FFF9E6',
  textPrimary: '#4A4A4A',
  textSecondary: '#757575',
  buttonBackground: '#8F1413',
  buttonText: '#FFFFFF',
  border: '#E0B84C',
  iconDefault: '#4A4A4A',
  mapPlaceholder: '#E0E0E0',
};

interface AddressFormState
  extends Omit<ApiAddress, 'id' | 'latitude' | 'longitude'> {
  houseNo: string;
  floor: string | null;
  towerBlock: string | null;
  landmark: string | null;
  latitude?: string;
  longitude?: string;
}

type AddAddressScreenRouteProp = RouteProp<
  AddressStackParamList,
  'AddAddressScreen'
>;
type AddAddressScreenNavigationProp = StackNavigationProp<
  AddressStackParamList,
  'AddAddressScreen'
>;

interface Props {
  route: AddAddressScreenRouteProp;
  navigation: AddAddressScreenNavigationProp;
}

const AddAddressScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {authData} = useAuth();
  const {loadingAdd, error: addressError} = useSelector(
    (state: RootState) => state.address,
  );

  const [addressForm, setAddressForm] = useState<AddressFormState>({
    name: '',
    houseNo: '',
    addressLine1: '',
    addressLine2: null,
    floor: null,
    towerBlock: null,
    landmark: null,
    city: '',
    state: '',
    pincode: '',
    tag: null,
    latitude: '37.78825', // Default
    longitude: '-122.4324', // Default
  });

  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [isDefault, setIsDefault] = useState(false);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] =
    useState(false);

  // --- Request Location Permission for RN CLI ---
  const requestLocationPermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    if (!permission) {
      Alert.alert(
        'Permission Error',
        'Location permission not applicable for this platform.',
      );
      return false;
    }

    try {
      let status = await check(permission);
      console.log('Initial location permission status:', status);

      if (status === RESULTS.GRANTED) {
        setIsLocationPermissionGranted(true);
        return true;
      }

      if (status === RESULTS.DENIED) {
        status = await request(permission);
        console.log('Requested location permission status:', status);
        if (status === RESULTS.GRANTED) {
          setIsLocationPermissionGranted(true);
          return true;
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to automatically set your address. Please enable it in settings or select location manually.',
          );
          setIsLocationPermissionGranted(false);
          return false;
        }
      }
      // Handle RESULTS.BLOCKED (user denied permanently) or RESULTS.UNAVAILABLE
      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Location permission is blocked. Please enable it in your app settings to use this feature.',
        );
      } else if (status === RESULTS.UNAVAILABLE) {
        Alert.alert(
          'Location Unavailable',
          'Location services are not available on this device.',
        );
      }
      setIsLocationPermissionGranted(false);
      return false;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      Alert.alert('Permission Error', 'Could not request location permission.');
      setIsLocationPermissionGranted(false);
      return false;
    }
  };

  useEffect(() => {
    const fetchInitialLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            console.log('Current position:', latitude, longitude);
            setMapRegion({
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.004,
            });
            setAddressForm(prev => ({
              ...prev,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            }));
          },
          error => {
            console.error(
              'Error Getting Location: ',
              error.code,
              error.message,
            );
            Alert.alert(
              'Location Error',
              'Could not fetch current location. Please select manually on the map.',
            );
            // Fallback to default region if needed, or just let user pan
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log(
          'Location permission not granted, using default map region.',
        );
        // User might have to pan to their location or enter address manually
      }
    };

    fetchInitialLocation();
  }, []); // Run once on mount

  const handleFormInputChange = (
    name: keyof AddressFormState,
    value: string | null,
  ) => {
    setAddressForm(prev => ({...prev, [name]: value}));
  };

  const onRegionChangeComplete = (newRegion: Region) => {
    setMapRegion(newRegion);
    setAddressForm(prev => ({
      ...prev,
      latitude: newRegion.latitude.toString(),
      longitude: newRegion.longitude.toString(),
    }));
  };

  const handleSaveAddress = () => {
    if (!authData) {
      Alert.alert(
        'Error',
        'Authentication details missing. Please log in again.',
      );
      return;
    }
    if (
      !addressForm.name ||
      !addressForm.addressLine1 ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.pincode
    ) {
      Alert.alert(
        'Validation Error',
        'Please fill in Name, Street Address/Area, City, State, and Pincode.',
      );
      return;
    }
    if (
      !addressForm.latitude ||
      !addressForm.longitude ||
      addressForm.latitude === '0' ||
      addressForm.longitude === '0'
    ) {
      Alert.alert(
        'Location Missing',
        'Please select a location on the map or ensure location services are enabled.',
      );
      return;
    }

    const apiAddressLine1 = `${
      addressForm.houseNo ? addressForm.houseNo.trim() + ', ' : ''
    }${addressForm.addressLine1.trim()}`;
    const apiAddressLine2 = addressForm.addressLine2?.trim() || null;
    const apiAddressLine3Parts = [
      addressForm.floor?.trim(),
      addressForm.towerBlock?.trim(),
      addressForm.landmark?.trim(),
    ].filter(Boolean);
    const apiAddressLine3 =
      apiAddressLine3Parts.length > 0 ? apiAddressLine3Parts.join(', ') : null;

    const newAddressData: Omit<ApiAddress, 'id'> = {
      name: addressForm.name.trim(),
      addressLine1: apiAddressLine1,
      addressLine2: apiAddressLine2,
      addressLine3: apiAddressLine3,
      city: addressForm.city.trim(),
      state: addressForm.state.trim(),
      pincode: addressForm.pincode.trim(),
      latitude: addressForm.latitude || '0',
      longitude: addressForm.longitude || '0',
      tag: addressForm.tag?.trim() || null,
    };

    dispatch(
      addUserAddress({
        authData: authData, // Pass the token string
        vendorId: '8765', // Replace if dynamic
        addressData: newAddressData,
        isDefaultAddress: isDefault,
      }),
    )
      .unwrap()
      .then(addedAddress => {
        Alert.alert(
          'Success',
          `Address for "${addedAddress.name}" added successfully!`,
        );
        navigation.goBack();
      })
      .catch(errMessage => {
        Alert.alert(
          'Error Saving Address',
          typeof errMessage === 'string'
            ? errMessage
            : 'An unknown error occurred.',
        );
      });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.backgroundPrimary}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={26} color={COLORS.iconDefault} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Address</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mapSection}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapView}
              region={mapRegion}
              onRegionChangeComplete={onRegionChangeComplete}
              showsUserLocation={isLocationPermissionGranted} // Only show if permission granted
              // followsUserLocation={isLocationPermissionGranted} // Optional:
            />
            <View style={styles.mapCenterMarker}>
              <Icon name="pin" size={34} color={COLORS.buttonBackground} />
            </View>
          </View>
          <Text style={styles.mapInstruction}>
            {isLocationPermissionGranted
              ? 'Pan map to adjust pin. Your location is shown.'
              : 'Pan map to set location. Enable location for auto-detection.'}
          </Text>

          {/* Form Fields ... same as before ... */}
          <View style={styles.formFieldsSection}>
            <View style={styles.formField}>
              <Text style={styles.label}>Contact Name:</Text>
              <TextInput
                /* ... */ value={addressForm.name}
                onChangeText={value => handleFormInputChange('name', value)}
                style={styles.input}
                placeholder="Enter name"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>House No, Building Name:</Text>
              <TextInput
                /* ... */ value={addressForm.houseNo}
                onChangeText={value => handleFormInputChange('houseNo', value)}
                style={styles.input}
                placeholder="e.g., A-123, Sunshine Apartments"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Street Address / Area:</Text>
              <TextInput
                /* ... */ value={addressForm.addressLine1}
                onChangeText={value =>
                  handleFormInputChange('addressLine1', value)
                }
                style={styles.input}
                placeholder="e.g., Main Street, Silicon Valley"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Locality / Sub-Area (Optional):</Text>
              <TextInput
                /* ... */ value={addressForm.addressLine2 || ''}
                onChangeText={value =>
                  handleFormInputChange('addressLine2', value)
                }
                style={styles.input}
                placeholder="e.g., Near City Park"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Floor (Optional):</Text>
              <TextInput
                /* ... */ value={addressForm.floor || ''}
                onChangeText={value => handleFormInputChange('floor', value)}
                style={styles.input}
                placeholder="e.g., 3rd Floor"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Tower / Block (Optional):</Text>
              <TextInput
                /* ... */ value={addressForm.towerBlock || ''}
                onChangeText={value =>
                  handleFormInputChange('towerBlock', value)
                }
                style={styles.input}
                placeholder="e.g., Tower A, Block B"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Landmark (Optional):</Text>
              <TextInput
                /* ... */ value={addressForm.landmark || ''}
                onChangeText={value => handleFormInputChange('landmark', value)}
                style={styles.input}
                placeholder="e.g., Opposite Post Office"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>City:</Text>
              <TextInput
                /* ... */ value={addressForm.city}
                onChangeText={value => handleFormInputChange('city', value)}
                style={styles.input}
                placeholder="Enter city"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>State:</Text>
              <TextInput
                /* ... */ value={addressForm.state}
                onChangeText={value => handleFormInputChange('state', value)}
                style={styles.input}
                placeholder="Enter state"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Pincode:</Text>
              <TextInput
                /* ... */ value={addressForm.pincode}
                onChangeText={value => handleFormInputChange('pincode', value)}
                style={styles.input}
                placeholder="Enter pincode"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>
                Tag (e.g., Home, Work - Optional):
              </Text>
              <TextInput
                /* ... */ value={addressForm.tag || ''}
                onChangeText={value => handleFormInputChange('tag', value)}
                style={styles.input}
                placeholder="Home, Work, etc."
              />
            </View>

            <View style={styles.toggleContainer}>
              <Text style={styles.labelToggle}>Set as Default Address</Text>
              <Switch
                trackColor={{false: '#767577', true: COLORS.buttonBackground}}
                thumbColor={isDefault ? COLORS.backgroundPrimary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsDefault}
                value={isDefault}
              />
            </View>

            {addressError && (
              <Text style={styles.errorTextForm}>
                {typeof addressError === 'string'
                  ? addressError
                  : 'An error occurred'}
              </Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAddress}
          disabled={loadingAdd}>
          {loadingAdd ? (
            <ActivityIndicator color={COLORS.buttonText} size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save Address</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles remain the same as your last provided version
const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: COLORS.backgroundPrimary},
  container: {flex: 1},
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
  backButton: {padding: 5, width: 40, alignItems: 'center'},
  backButtonPlaceholder: {width: 40},
  headerTitle: {fontSize: 18, fontWeight: '600', color: COLORS.textPrimary},
  formContainer: {flex: 1, backgroundColor: '#FFFFFF'},
  scrollViewContent: {paddingBottom: 20},
  mapSection: {
    height: 200,
    backgroundColor: COLORS.mapPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {...StyleSheet.absoluteFillObject},
  mapCenterMarker: {},
  mapInstruction: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.backgroundSecondary,
  },
  formFieldsSection: {paddingHorizontal: 20, paddingTop: 20},
  formField: {marginBottom: 18},
  label: {fontSize: 14, color: COLORS.textSecondary, marginBottom: 6},
  input: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 48,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  labelToggle: {fontSize: 15, color: COLORS.textPrimary, flex: 1},
  errorTextForm: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: COLORS.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 10 : 20,
    marginTop: 10,
    borderRadius: 8,
  },
  saveButtonText: {color: COLORS.buttonText, fontSize: 16, fontWeight: 'bold'},
});

export default AddAddressScreen;
