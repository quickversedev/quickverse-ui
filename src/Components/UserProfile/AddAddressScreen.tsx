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
    latitude: '37.78825', // Default latitude (India)
    longitude: '-122.4324', // Default longitude
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

  const [isFetchingPincodeDetails, setIsFetchingPincodeDetails] =
    useState(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null); // Optional for displaying specific pincode errors

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
            'Location permission is required. Please enable it in settings or select location manually.',
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

  useEffect(() => {
    const fetchInitialLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            const initialRegion = {
              latitude,
              longitude,
              latitudeDelta: 20.593,
              longitudeDelta: 78.962,
            };
            setMapRegion(initialRegion);
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
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
          },
        );
      }
    };

    fetchInitialLocation();
  }, []);

  const pincodeApiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFormInputChange = (
    name: keyof AddressFormState,
    value: string | null,
  ) => {
    const newValue = value || ''; // Ensure value is a string for length check etc.
    setAddressForm(prev => ({...prev, [name]: newValue}));

    if (name === 'pincode') {
      // Clear previous timeout if user is still typing
      if (pincodeApiTimeoutRef.current) {
        clearTimeout(pincodeApiTimeoutRef.current);
      }
      // If pincode is 6 digits, trigger the API call after a short delay
      if (newValue.length === 6) {
        pincodeApiTimeoutRef.current = setTimeout(() => {
          fetchDetailsFromPincode(newValue);
        }, 800); // Debounce for 800ms
      } else {
        // Optionally clear city/state if pincode becomes invalid or shorter
        // setAddressForm(prev => ({ ...prev, city: '', state: '' }));
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

    // Construct the payload directly from addressForm, applying trim and null checks
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
      .then(addedAddress => {
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
    setPincodeError(null); // Clear previous error
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
        const data = response.data[0]; // Get the first result object
        if (
          data.Status === 'Success' &&
          data.PostOffice &&
          data.PostOffice.length > 0
        ) {
          const postOfficeInfo = data.PostOffice[0]; // Take details from the first post office

          // Extract City (District) and State
          const city = postOfficeInfo.District;
          const state = postOfficeInfo.State;

          // Update the form state
          setAddressForm(prev => ({
            ...prev,
            city: city || prev.city, // Use fetched city, or keep existing if API doesn't return it
            state: state || prev.state, // Use fetched state, or keep existing
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
              showsUserLocation={isLocationPermissionGranted}
              // onPress={e => onRegionChangeComplete(e.nativeEvent.coordinate)} // Alternative to center pin
            />
            <View style={styles.mapCenterMarkerContainer}>
              <Icon name="pin" size={34} color={COLORS.buttonBackground} />
            </View>
          </View>
          <Text style={styles.mapInstruction}>
            {'Pan map to set location.'}
          </Text>

          <View style={styles.formFieldsSection}>
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
                  maxLength={6} // Restrict to 6 digits
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

            {/* city & state from pinCode */}
            <View style={styles.formField}>
              <Text style={styles.label}>City:</Text>
              <TextInput
                value={addressForm.city}
                onChangeText={value => handleFormInputChange('city', value)}
                style={styles.input}
                placeholder="Enter city"
                maxLength={20}
                editable={isFetchingPincodeDetails}
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
                editable={isFetchingPincodeDetails}
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
            {/* Display Latitude and Longitude (read-only) */}
            {/* {addressForm.latitude && addressForm.longitude && (
              <View style={styles.formField}>
                <Text style={styles.label}>Coordinates (from map):</Text>
                <Text style={styles.coordsText}>
                  Lat: {parseFloat(addressForm.latitude).toFixed(4)}, Lon:{' '}
                  {parseFloat(addressForm.longitude).toFixed(4)}
                </Text>
              </View>
            )} */}
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
const screenHeight = Dimensions.get('window').height; // Get screen height

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
    overflow: 'hidden' /* No side margins for full width map */,
  },
  mapView: {...StyleSheet.absoluteFillObject},
  mapCenterMarkerContainer: {
    /* This view is a conceptual overlay for the pin icon */
  },
  mapLoadingIndicator: {
    position: 'absolute',
    top: 10 /* Adjust based on pin icon */,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 10 : 20,
    marginTop: 10,
    borderRadius: 8,
  },
  saveButtonText: {color: COLORS.buttonText, fontSize: 16, fontWeight: 'bold'},
  pincodeInputContainer: {
    // New style
    flexDirection: 'row',
    alignItems: 'center',
    // Reuse input style for border, background etc. or define separately
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
    borderColor: COLORS.border,
    borderWidth: 1,
    minHeight: 48, // Match other inputs
  },
  pincodeInput: {
    // New style
    flex: 1, // Take up available space before loader
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  pincodeLoader: {
    // New style
    marginRight: 10,
  },
  pincodeErrorText: {
    // Optional
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default AddAddressScreen;
