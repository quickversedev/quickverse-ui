import React, {useState, useEffect, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';

// --- Geolocation and Permissions ---
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// --- End Geolocation and Permissions ---

import {AppDispatch, RootState} from '../../store/store';
import {addUserAddress, ApiAddress} from '../../services/userAddressSlice';
import {useAuth} from '../../utils/AuthContext';
import {AddressStackParamList} from './AddressScreen';
import OlaPlaceAutocomplete from '../OlaPlaceAutocomplete';

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

interface AddressFormState extends Omit<ApiAddress, 'id'> {}

// Type Arguments for Navigation Props
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

const AddAddressScreen: React.FC<Props> = ({navigation}) => {
  const [selectedPlace, setSelectedPlace] = useState();
  const OLA_MAPS_API_KEY = 'U3I3QUrUi1bjLCMQgtZGWzF2v0Wd7InexqwCaXhn';

  const dispatch = useDispatch<AppDispatch>();
  const {authData} = useAuth();
  const {loadingAdd, error: addressError} = useSelector(
    (state: RootState) => state.userAddresses,
  );

  const [addressForm, setAddressForm] = useState<AddressFormState>({
    name: '',
    addressLine1: '',
    addressLine2: null,
    addressLine3: null,
    city: '',
    state: '',
    pincode: '',
    tag: null,
    latitude: '', // Changed: Initialize as empty
    longitude: '', // Changed: Initialize as empty
  });

  // Changed: Initialize mapRegion to null to wait for user's location
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Added: Loading state for initial location fetch

  const [isDefault, setIsDefault] = useState(false);
  const [isLocationPermissionGranted, setIsLocationPermissionGranted] =
    useState(false);

  const [isFetchingPincodeDetails, setIsFetchingPincodeDetails] =
    useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);

  const requestLocationPermission = async (): Promise<boolean> => {
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
      if (status === RESULTS.GRANTED) {
        setIsLocationPermissionGranted(true);
        return true;
      }
      if (status === RESULTS.DENIED) {
        status = await request(permission);
        if (status === RESULTS.GRANTED) {
          setIsLocationPermissionGranted(true);
          return true;
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to automatically find your address. Please enable it in settings or select a location manually.',
          );
          setIsLocationPermissionGranted(false);
          return false;
        }
      }
      if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Permission Blocked',
          'Location permission is blocked. Please enable it in your app settings.',
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

  // Changed: Updated useEffect to handle loading state and provide a fallback
  useEffect(() => {
    const fetchInitialLocation = async () => {
      setIsInitialLoading(true);
      const hasPermission = await requestLocationPermission();

      const fallbackToDefaultLocation = () => {
        // Fallback to a central location in India if permission/fetch fails
        setMapRegion({
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 15, // Zoom out to show a larger area of the country
          longitudeDelta: 15,
        });
        setIsInitialLoading(false); // Stop loading
      };

      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            const initialRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.005, // Zoom in on the user's location
              longitudeDelta: 0.004,
            };
            setMapRegion(initialRegion);
            setAddressForm(prev => ({
              ...prev,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            }));
            setIsInitialLoading(false); // Stop loading on success
          },
          error => {
            console.error(
              'Error Getting Location: ',
              error.code,
              error.message,
            );
            Alert.alert(
              'Location Error',
              'Could not fetch current location. Showing a default map area.',
            );
            fallbackToDefaultLocation(); // Use fallback on error
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
          },
        );
      } else {
        // Permission denied, use fallback
        fallbackToDefaultLocation();
      }
    };

    fetchInitialLocation();
  }, []);

  const pincodeApiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFormInputChange = (
    name: keyof AddressFormState,
    value: string | null,
  ) => {
    const newValue = value || '';
    setAddressForm(prev => ({...prev, [name]: newValue}));

    if (name === 'pincode') {
      if (pincodeApiTimeoutRef.current) {
        clearTimeout(pincodeApiTimeoutRef.current);
      }
      if (newValue.length === 6) {
        pincodeApiTimeoutRef.current = setTimeout(() => {
          fetchDetailsFromPincode(newValue);
        }, 800);
      }
    }
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
        'Please fill in Name, Address Line 1, City, State, and Pincode.',
      );
      return;
    }
    if (
      !addressForm.latitude ||
      !addressForm.longitude ||
      addressForm.latitude === '0' ||
      addressForm.longitude === '0'
    ) {
      Alert.alert('Location Missing', 'Please select a location on the map.');
      return;
    }

    const newAddressData: Omit<ApiAddress, 'id'> = {
      name: addressForm.name.trim(),
      addressLine1: addressForm.addressLine1.trim(),
      addressLine2: addressForm.addressLine2?.trim() || null,
      addressLine3: addressForm.addressLine3?.trim() || null,
      city: addressForm.city.trim(),
      state: addressForm.state.trim(),
      pincode: addressForm.pincode.trim(),
      latitude: Number(addressForm.latitude).toFixed(4),
      longitude: Number(addressForm.longitude).toFixed(4),
      tag: addressForm.tag?.trim() || null,
    };

    console.log('PAYLOAD:', newAddressData);

    dispatch(
      addUserAddress({
        authData: authData,
        vendorId: '8765',
        addressData: newAddressData,
        isDefaultAddress: isDefault,
      }),
    )
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Address added successfully!');
        navigation.goBack();
      })
      .catch(errMessage => {
        Alert.alert(
          'Error Saving Address',
          typeof errMessage === 'string'
            ? errMessage
            : 'An unknown error occurred.',
        );
        console.warn('ERRORR:', errMessage);
      });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const fetchDetailsFromPincode = async (pinCode: string) => {
    if (pinCode.length !== 6) {
      setPincodeError('Pincode must be 6 digits.');
      return;
    }
    setPincodeError(null);
    setIsFetchingPincodeDetails(true);
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pinCode}`,
      );
      console.log('Pincode API Response:', response.data);

      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const data = response.data[0];
        if (
          data.Status === 'Success' &&
          data.PostOffice &&
          data.PostOffice.length > 0
        ) {
          const postOfficeInfo = data.PostOffice[0];
          const city = postOfficeInfo.District;
          const state = postOfficeInfo.State;

          setAddressForm(prev => ({
            ...prev,
            city: city || prev.city,
            state: state || prev.state,
          }));
          Alert.alert(
            'Location Info',
            `Fetched City: ${city}, State: ${state} for pincode ${pinCode}. Please verify.`,
          );
        } else if (data.Status === 'Error') {
          Alert.alert(
            'Pincode Error',
            data.Message || 'Invalid Pincode or no details found.',
          );
          console.warn('Pincode API Error:', data.Message);
        } else if (data.Status === '404') {
          Alert.alert(
            'Pincode Not Found',
            `No details found for pincode ${pinCode}.`,
          );
          console.warn('Pincode API: 404 Not Found');
        } else {
          Alert.alert(
            'Pincode Info',
            'No post office details found for this pincode.',
          );
          console.warn('No PostOffice details in pincode response:', data);
        }
      } else {
        Alert.alert('Pincode Error', 'Invalid response from pincode API.');
        console.warn('Unexpected response from pincode API:', response.data);
      }
    } catch (error) {
      console.error('Error fetching pincode details:', error);
      Alert.alert(
        'API Error',
        'Could not fetch details for the pincode. Please check your connection or try again.',
      );
    } finally {
      setIsFetchingPincodeDetails(false);
    }
  };

  const handleSuggestionPress = place => {
    setSelectedPlace(place);
    const latitude = place.geometry.location.lat;
    const longitude = place.geometry.location.lng;

    setMapRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });

    setAddressForm(prev => ({
      ...prev,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    }));
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

        <OlaPlaceAutocomplete
          apiKey={OLA_MAPS_API_KEY}
          onPlaceSelected={handleSuggestionPress}
          placeholder="Enter address or point of interest"
          latitude={addressForm.latitude}
          longitude={addressForm.longitude}
        />

        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          {/* --- Changed: Conditional rendering for MapView --- */}
          <View style={styles.mapSection}>
            {isInitialLoading ? (
              <ActivityIndicator size="large" color={COLORS.buttonBackground} />
            ) : (
              <>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.mapView}
                  region={mapRegion!} // '!' asserts mapRegion is not null here due to the loading logic
                  onRegionChangeComplete={onRegionChangeComplete}
                  showsUserLocation={isLocationPermissionGranted}
                />
                <View style={styles.mapCenterMarkerContainer}>
                  <Icon name="pin" size={34} color={COLORS.buttonBackground} />
                </View>
              </>
            )}
          </View>
          <Text style={styles.mapInstruction}>
            {'Pan map to set location.'}
          </Text>

          <View style={styles.formFieldsSection}>
            {/* ... rest of the form fields ... */}
            <View style={styles.formField}>
              <Text style={styles.label}>Contact Name:</Text>
              <TextInput
                value={addressForm.name}
                onChangeText={value => handleFormInputChange('name', value)}
                style={styles.input}
                placeholder="Enter name"
                maxLength={20}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Address Line 1:</Text>
              <TextInput
                value={addressForm.addressLine1}
                onChangeText={value =>
                  handleFormInputChange('addressLine1', value)
                }
                style={styles.input}
                numberOfLines={3}
                multiline={true}
                maxLength={120}
                placeholder="e.g., House No, Street, Main Road"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Address Line 2:</Text>
              <TextInput
                value={addressForm.addressLine2 || ''}
                onChangeText={value =>
                  handleFormInputChange('addressLine2', value)
                }
                style={styles.input}
                numberOfLines={3}
                multiline={true}
                maxLength={120}
                placeholder="e.g., Apt, Suite, Locality, Area"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Address Line 3:</Text>
              <TextInput
                value={addressForm.addressLine3 || ''}
                onChangeText={value =>
                  handleFormInputChange('addressLine3', value)
                }
                style={styles.input}
                numberOfLines={3}
                multiline={true}
                maxLength={120}
                placeholder="e.g., Landmark, Floor, Tower/Block"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Pincode:</Text>
              <View style={styles.pincodeInputContainer}>
                <TextInput
                  value={addressForm.pincode}
                  onChangeText={value =>
                    handleFormInputChange('pincode', value)
                  }
                  style={styles.pincodeInput}
                  placeholder="Enter 6-digit pincode"
                  keyboardType="numeric"
                  maxLength={6}
                />
                {isFetchingPincodeDetails && (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.buttonBackground}
                    style={styles.pincodeLoader}
                  />
                )}
              </View>
              {pincodeError && (
                <Text style={styles.pincodeErrorText}>{pincodeError}</Text>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>City:</Text>
              <TextInput
                value={addressForm.city}
                onChangeText={value => handleFormInputChange('city', value)}
                style={styles.input}
                placeholder="Enter city"
                maxLength={20}
                editable={!isFetchingPincodeDetails}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>State:</Text>
              <TextInput
                value={addressForm.state}
                onChangeText={value => handleFormInputChange('state', value)}
                style={styles.input}
                placeholder="Enter state"
                maxLength={20}
                editable={!isFetchingPincodeDetails}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>
                Tag (e.g., Home, Work - Optional):
              </Text>
              <TextInput
                value={addressForm.tag || ''}
                onChangeText={value => handleFormInputChange('tag', value)}
                style={styles.input}
                placeholder="Home, Work, etc."
                maxLength={20}
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
          style={[
            styles.saveButton,
            (loadingAdd || isFetchingPincodeDetails) &&
              styles.saveButtonDisabled,
          ]}
          onPress={handleSaveAddress}
          disabled={loadingAdd || isFetchingPincodeDetails}>
          {loadingAdd || isFetchingPincodeDetails ? (
            <ActivityIndicator color={COLORS.buttonText} size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save Address</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- Styles ---
const screenHeight = Dimensions.get('window').height;

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
    height: screenHeight * 0.3,
    backgroundColor: COLORS.mapPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapView: {...StyleSheet.absoluteFillObject},
  mapCenterMarkerContainer: {
    /* This view is an overlay for the pin icon, centered by its parent */
  },
  // The mapLoadingIndicator style is no longer needed as ActivityIndicator is centered by mapSection flex properties
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
  coordsText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginTop: 4,
    paddingVertical: 5,
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
  saveButtonDisabled: {
    backgroundColor: 'grey',
  },
  saveButtonText: {color: COLORS.buttonText, fontSize: 16, fontWeight: 'bold'},
  pincodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
    borderColor: COLORS.border,
    borderWidth: 1,
    minHeight: 48,
  },
  pincodeInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  pincodeLoader: {
    marginRight: 10,
  },
  pincodeErrorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  // --- OlaPlaceAutocomplete Styles ---
  // (Assuming these are defined within the OlaPlaceAutocomplete component or passed as props)
});

export default AddAddressScreen;
