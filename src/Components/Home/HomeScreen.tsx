import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Animated,
  Platform,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import theme from '../../theme';
import HomeScreenVendors from './homeVendors/HomeScreenVendors';
import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
import CampusBuzz from './campusBuzz/CampusBuzz';
import FeaturedItems from './featuredItems/FeaturedItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getIsNewUser, setCampus} from '../../utils/Storage';
import {fetchCampusIds} from '../../services/fetchCampusIds';
import LoginDetails from '../Login/loginDetails';
import {useAuth} from '../../utils/AuthContext';
import CartScreen from '../Cart/CartScreen';
import {useSelector} from 'react-redux';
import {selectCart} from '../../services/cart/productCartSlice';
import {autoSelectCampus} from '../util/locationUtil';
import Geolocation from 'react-native-geolocation-service';

const HomeScreen: React.FC = () => {
  const [selectedCampusId, setSelectedCampusId] = useState<
    string | undefined
  >();
  const [modalVisible, setModalVisible] = useState(false);
  const [campusOptions, setCampusOptions] = useState<any>([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false); // Proper loading state
  const [searchText, setSearchText] = useState('');
  const isFirstTimeLogin = getIsNewUser();
  const {selectedCampus} = useAuth();
  const animationValue = useRef(new Animated.Value(1000)).current;
  const cart = useSelector(selectCart);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const closeCartModal = () => {
    Animated.timing(animationValue, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const fetchCampus = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetchCampusIds();
      const campusOption = response?.map(campus => ({
        label: campus.campusName,
        value: campus.campusId,
        displayName: campus.displayName,
        longitude: campus.longitude,
        latitude: campus.latitude,
      }));
      setCampusOptions(campusOption);
      console.log('campusFetched');
      await getDeviceLocation(campusOption); // Pass campus options to getDeviceLocation
    } catch (error) {
      console.error('Error fetching campuses:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const requestLocationPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to find nearby campuses.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  const requestLocationPermissionIOS = async () => {
    try {
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status === 'granted';
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  const checkAndRequestLocationPermission = async () => {
    let hasPermission = false;

    if (Platform.OS === 'android') {
      hasPermission = await requestLocationPermissionAndroid();
    } else if (Platform.OS === 'ios') {
      hasPermission = await requestLocationPermissionIOS();
    }

    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please enable location permissions in settings to use this feature.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }

    return hasPermission;
  };

  const getDeviceLocation = async (campuses: any[]) => {
    const startTime = new Date();
    const hasPermission = await checkAndRequestLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to find nearby campuses.',
      );
      setSelectedCampusId('IIMU-313001'); // Fallback to default campus
      setCampus('IIMU-313001'); // Save default campus to storage
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Device location:', latitude, longitude);

        const campusId = autoSelectCampus(latitude, longitude, campuses);
        if (campusId) {
          setSelectedCampusId(campusId);
          setCampus(campusId); // Save selected campus to storage
        } else {
          setSelectedCampusId('IIMU-313001'); // Default campus
          setCampus('IIMU-313001'); // Save default campus to storage
          console.log('No campus found within 5km radius.');
        }

        const endTime = new Date();
        const elapsedTime = endTime.getTime() - startTime.getTime();
        console.log(`Time taken to complete: ${elapsedTime}ms`);
      },
      error => {
        console.error('Error fetching location:', error);
        Alert.alert(
          'Error',
          'Unable to fetch your location. Please try again later.',
        );
        setSelectedCampusId('IIMU-313001');
        setCampus('IIMU-313001');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    fetchCampus();
  }, []);

  useEffect(() => {
    if (selectedCampusId) {
      setCampus(selectedCampusId);
    }
  }, [selectedCampusId]);

  useEffect(() => {
    selectedCampus && setSelectedCampusId(selectedCampus);
  }, [selectedCampus]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={{color: theme.colors.ternary}}>Loading campuses...</Text>
      </SafeAreaView>
    );
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header with campus selector and cart */}
        <View style={styles.headerContainer}>
          <View style={styles.campusSelector}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setClicked(!clicked)}>
              <MaterialCommunityIcons
                name={'navigation-variant'}
                size={18}
                color={theme.colors.ternary}
                style={{marginRight: 5, marginTop: 4}}
              />
              <View>
                <Text style={styles.touchableText}>
                  {selectedCampusId === '' ? 'Select Campus' : selectedCampusId}
                </Text>
                <Text style={{display: 'none'}}>{'campus address'}</Text>
              </View>
              <MaterialCommunityIcons
                name={clicked ? 'menu-up' : 'menu-down'}
                size={28}
                color={theme.colors.ternary}
                style={{marginTop: -2}}
              />
            </TouchableOpacity>

            {clicked && (
              <View style={styles.dropdownContainer}>
                <View style={styles.searchContainer}>
                  <MaterialCommunityIcons
                    name="magnify"
                    size={20}
                    color={theme.colors.ternary}
                    style={styles.searchIcon}
                  />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search campus..."
                    placeholderTextColor={theme.colors.ternary}
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setSearchText('')}
                      style={styles.clearIcon}>
                      <MaterialCommunityIcons
                        name="close-circle"
                        size={20}
                        color={theme.colors.ternary}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <FlatList
                  data={campusOptions?.filter(item =>
                    item.value.toLowerCase().includes(searchText.toLowerCase()),
                  )}
                  keyExtractor={item => item.value}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => {
                        setSelectedCampusId(item.value);
                        setClicked(false);
                        setSearchText('');
                      }}>
                      <Text style={styles.listItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color="#FFDC52"
            />
            {totalCartItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {isFirstTimeLogin && <LoginDetails />}
        <ScrollView style={styles.scrollView}>
          <PromoDiscounts campus={selectedCampusId} />
          <FeaturedItems campus={selectedCampusId} />
          <HomeScreenVendors campus={selectedCampusId} />
          <CampusBuzz campus={selectedCampusId} />
        </ScrollView>
      </SafeAreaView>
      <CartScreen modalVisible={modalVisible} closeCartModal={closeCartModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  campusSelector: {
    flex: 1,
    zIndex: 2,
  },
  touchableOpacity: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  touchableText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
  dropdownContainer: {
    elevation: 5,
    marginTop: 10,
    maxHeight: 500,
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0.9,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    position: 'absolute',
    top: 60,
    zIndex: 10,
  },
  listItem: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: theme.colors.ternary,
  },
  listItemText: {
    fontWeight: '600',
    color: theme.colors.ternary,
  },
  scrollView: {
    zIndex: 1,
  },
  cartButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: Platform.select({
      ios: 40,
      android: 45,
    }),
    paddingLeft: Platform.select({
      ios: 40,
      android: 45,
    }),
    paddingRight: 35,
    borderWidth: Platform.select({
      ios: 0.5,
      android: 0.9,
    }),
    borderColor: theme.colors.ternary,
    borderRadius: Platform.select({
      ios: 10,
      android: 8,
    }),
    backgroundColor: theme.colors.primary,
    fontSize: Platform.select({
      ios: 16,
      android: 14,
    }),
    color: theme.colors.ternary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default HomeScreen;
