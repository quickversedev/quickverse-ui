import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
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
  RefreshControl,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const Icon = MaterialCommunityIcons as unknown as React.ComponentType<{
  name: string;
  size: number;
  color: string;
  style?: any;
}>;

const HomeScreen: React.FC = () => {
  const [selectedCampusId, setSelectedCampusId] = useState<
    string | undefined
  >();
  const [campusToastVisible, setCampusToastVisible] = useState(false);
  const [campusToastName, setCampusToastName] = useState('');
  const [campusError, setCampusError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [campusOptions, setCampusOptions] = useState<any>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false); // Proper loading state
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const isFirstTimeLogin = getIsNewUser();
  const {selectedCampus} = useAuth();
  const animationValue = useRef(new Animated.Value(1000)).current;
  const toastAnimation = useRef(new Animated.Value(0)).current;
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
    setLoading(true);
    setCampusError(false);
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
      await getDeviceLocation(campusOption);
    } catch (error) {
      console.error('Error fetching campuses:', error);
      setCampusError(true);
    } finally {
      setLoading(false);
    }
  };

  const requestLocationPermissionAndroid = async () => {
    try {
      // First check if we already have the permission
      const alreadyGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (alreadyGranted) {
        return true;
      }

      // If not granted, request it with a delay to ensure Activity is ready
      await new Promise(resolve => setTimeout(resolve, 100));

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
        // console.log('Device location:', latitude, longitude);

        const campusId = autoSelectCampus(latitude, longitude, campuses);
        if (campusId) {
          setSelectedCampusId(campusId);
          setCampus(campusId);
          setCampusToastName(campusId);
          showToast();
        } else {
          setSelectedCampusId('IIMU-313001'); // Default campus
          setCampus('IIMU-313001'); // Save default campus to storage
          // console.log('No campus found within 5km radius.');
        }

        // const endTime = new Date();
        // const elapsedTime = endTime.getTime() - startTime.getTime();
        // console.log(`Time taken to complete: ${elapsedTime}ms`);
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
    if (!selectedCampusId) {
      fetchCampus();
    }
  }, []);

  useEffect(() => {
    if (selectedCampusId) {
      setCampus(selectedCampusId);
    }
  }, [selectedCampusId]);

  useEffect(() => {
    selectedCampus && setSelectedCampusId(selectedCampus);
  }, [selectedCampus]);
  // Toast animation functions
  const showToast = () => {
    setCampusToastVisible(true);
    Animated.spring(toastAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const hideToast = () => {
    Animated.timing(toastAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCampusToastVisible(false);
    });
  };

  useEffect(() => {
    if (campusToastVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000); // Hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [campusToastVisible]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (!selectedCampusId) {
        await fetchCampus();
      }
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
      {/* Header with campus selector and cart */}
      <View style={styles.headerContainer}>
        <View style={styles.campusSelector}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setClicked(true)}>
            <Icon
              name="navigation-variant"
              size={18}
              color={theme.colors.ternary}
              style={{marginRight: 5, marginTop: 4}}
            />
            <View>
              <Text style={styles.touchableText}>
                {selectedCampusId === '' ? 'Select Campus' : selectedCampusId}
              </Text>
            </View>
            <Icon
              name="chevron-down"
              size={28}
              color={theme.colors.ternary}
              style={{marginTop: -2}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setModalVisible(true)}>
          <Icon name="cart-outline" size={24} color="#FFDC52" />
          {totalCartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {isFirstTimeLogin && <LoginDetails />}
      <ScrollView
        style={styles.scrollView}
        scrollEnabled={!clicked}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.secondary]} // Customize as needed
            tintColor={theme.colors.secondary} // Customize as needed
          />
        }>
        <PromoDiscounts campus={selectedCampusId} key={`promo-${refreshKey}`} />
        <FeaturedItems
          campus={selectedCampusId}
          key={`featured-${refreshKey}`}
        />
        <HomeScreenVendors
          campus={selectedCampusId}
          key={`vendors-${refreshKey}`}
        />
        <CampusBuzz campus={selectedCampusId} key={`buzz-${refreshKey}`} />
      </ScrollView>
      {campusToastVisible && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: toastAnimation,
              transform: [
                {
                  translateY: toastAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.toastText}>
            Currently showing vendors for {campusToastName}
          </Text>
        </Animated.View>
      )}

      {/* Campus Selection Modal */}
      <Modal
        visible={clicked}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setClicked(false);
          setSearchText('');
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Campus</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setClicked(false);
                  setSearchText('');
                }}>
                <Icon name="close" size={24} color={theme.colors.ternary} />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={styles.modalLoadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={theme.colors.secondary}
                />
                <Text style={styles.loadingText}>Loading campuses...</Text>
              </View>
            ) : campusError ? (
              <View style={styles.modalErrorContainer}>
                <Text style={styles.modalErrorText}>
                  Failed to fetch campuses. Please try again.
                </Text>
                <TouchableOpacity
                  style={styles.modalRetryButton}
                  onPress={fetchCampus}>
                  <Text style={styles.modalRetryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.modalSearchContainer}>
                  <Icon
                    name="magnify"
                    size={20}
                    color={theme.colors.ternary}
                    style={styles.modalSearchIcon}
                  />
                  <TextInput
                    style={styles.modalSearchInput}
                    placeholder="Search campus..."
                    placeholderTextColor={theme.colors.ternary}
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setSearchText('')}
                      style={styles.modalClearIcon}>
                      <Icon
                        name="close-circle"
                        size={20}
                        color={theme.colors.ternary}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <ScrollView
                  style={styles.modalScrollView}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}>
                  {campusOptions
                    ?.filter((item: any) => {
                      const searchTerm = searchText.toLowerCase();
                      return (
                        item.value.toLowerCase().includes(searchTerm) ||
                        (item.displayName &&
                          item.displayName
                            .toLowerCase()
                            .includes(searchTerm)) ||
                        (item.label &&
                          item.label.toLowerCase().includes(searchTerm))
                      );
                    })
                    .map((item: any) => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.modalListItem}
                        onPress={() => {
                          setSelectedCampusId(item.value);
                          setCampusToastName(item.displayName);
                          showToast();
                          setClicked(false);
                          setSearchText('');
                        }}>
                        <Text style={styles.modalListItemText}>
                          {item.displayName}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      <CartScreen modalVisible={modalVisible} closeCartModal={closeCartModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
    borderRadius: 15,
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

  scrollView: {
    zIndex: 1,
  },
  cartButton: {
    height: 50,
    width: 50,
    borderRadius: 15,
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
    borderRadius: 15,
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
      ios: 15,
      android: 15,
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
  toastContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
  },
  toastText: {
    color: theme.colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
  },
  retryButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 70,
  },
  modalContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 20,
    width: '90%',
    minHeight: '60%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ternary,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
  closeButton: {
    padding: 5,
  },
  modalLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.ternary,
  },
  modalErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  modalErrorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalRetryButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
  },
  modalRetryButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  modalSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  modalSearchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  modalClearIcon: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  modalSearchInput: {
    flex: 1,
    height: 45,
    paddingLeft: 45,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: theme.colors.ternary,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    fontSize: 16,
    color: theme.colors.ternary,
  },
  modalListItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.ternary,
  },
  modalListItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.ternary,
  },
  modalScrollView: {
    flex: 1,
    maxHeight: 400,
  },
});

export default HomeScreen;
