import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Switch} from 'react-native';

import {AppDispatch, RootState} from '../../store/store';
import {addUserAddress, ApiAddress} from '../../services/userAddressSlice';
import {useAuth} from '../../utils/AuthContext';
import {AddressStackParamList} from './AddressListScreen'; // Import from AddressListScreen or a central types file

const COLORS = {
  // Keep your COLORS
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

interface AddressFormState // Same as before
  extends Omit<ApiAddress, 'id' | 'latitude' | 'longitude'> {
  houseNo: string;
  floor: string | null;
  towerBlock: string | null;
  landmark: string | null;
  latitude?: string;
  longitude?: string;
}

// Navigation props for this screen
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

  // TODO: If editing, const addressId = route.params?.addressId;
  // TODO: If editing, fetch existing address details and prefill form

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
    latitude: '',
    longitude: '',
  });

  // TODO: If editing, useEffect to prefill form when addressId changes or data loads

  const [isDefault, setIsDefault] = useState(false); // Default to false

  const handleFormInputChange = (
    name: keyof AddressFormState,
    value: string | null,
  ) => {
    setAddressForm(prev => ({...prev, [name]: value}));
  };

  const handleSaveAddress = () => {
    if (!authData) {
      Alert.alert('Error', 'Authentication details missing.');
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
        'Please fill in Name, Street Address, City, State, and Pincode.',
      );
      return;
    }

    const apiAddressLine1 = `${
      addressForm.houseNo ? addressForm.houseNo + ', ' : ''
    }${addressForm.addressLine1}`;
    const apiAddressLine2 = addressForm.addressLine2 || null;
    const apiAddressLine3 =
      [addressForm.floor, addressForm.towerBlock, addressForm.landmark]
        .filter(Boolean)
        .join(', ') || null;

    const newAddressData: Omit<ApiAddress, 'id'> = {
      name: addressForm.name,
      addressLine1: apiAddressLine1,
      addressLine2: apiAddressLine2,
      addressLine3: apiAddressLine3,
      city: addressForm.city,
      state: addressForm.state,
      pincode: addressForm.pincode,
      latitude: addressForm.latitude || '0',
      longitude: addressForm.longitude || '0',
      tag: addressForm.tag || null,
    };

    // TODO: If editing, dispatch an 'updateUserAddress' thunk instead
    dispatch(
      addUserAddress({
        authData: authData,
        vendorId: '8765',
        addressData: newAddressData,
        isDefaultAddress: isDefault, // Use the state variable for the toggle
      }),
    )
      .unwrap()
      .then(addedAddress => {
        Alert.alert('Success', `Address "${addedAddress.name}" added!`);
        // Refetch addresses on the list screen after successful add
        // The list screen will refetch on focus, or you can pass a param
        navigation.goBack();
      })
      .catch(errMessage => {
        Alert.alert(
          'Error Saving Address',
          errMessage || 'Failed to save address.',
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
        {/* Adjust offset */}
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={26} color={COLORS.iconDefault} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {/* TODO: Change title if editing */}
            Add New Address
          </Text>
          <View style={styles.backButton} />
        </View>
        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollViewContent}>
          {/* Map Area Placeholder - For location picking */}
          <View style={styles.mapSection}>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapPlaceholderText}>
                Map View Placeholder (for picking location)
              </Text>
            </View>
            {/* TODO: Add button "Use Current Location" or "Pick on Map" */}
          </View>

          {/* Form Fields */}
          <View style={styles.formFieldsSection}>
            <View style={styles.formField}>
              <Text style={styles.label}>Contact Name:</Text>
              <TextInput
                placeholder="Enter name"
                style={styles.input}
                value={addressForm.name}
                onChangeText={value => handleFormInputChange('name', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>House No, Building Name:</Text>
              <TextInput
                placeholder="e.g., A-123, Sunshine Apartments"
                style={styles.input}
                value={addressForm.houseNo}
                onChangeText={value => handleFormInputChange('houseNo', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Street Address / Area:</Text>
              <TextInput
                placeholder="e.g., Main Street, Silicon Valley"
                style={styles.input}
                value={addressForm.addressLine1}
                onChangeText={value =>
                  handleFormInputChange('addressLine1', value)
                }
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Locality / Sub-Area (Optional):</Text>
              <TextInput
                placeholder="e.g., Near City Park"
                style={styles.input}
                value={addressForm.addressLine2 || ''}
                onChangeText={value =>
                  handleFormInputChange('addressLine2', value)
                }
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Floor (Optional):</Text>
              <TextInput
                placeholder="e.g., 3rd Floor"
                style={styles.input}
                value={addressForm.floor || ''}
                onChangeText={value => handleFormInputChange('floor', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Tower / Block (Optional):</Text>
              <TextInput
                placeholder="e.g., Tower A, Block B"
                style={styles.input}
                value={addressForm.towerBlock || ''}
                onChangeText={value =>
                  handleFormInputChange('towerBlock', value)
                }
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Landmark (Optional):</Text>
              <TextInput
                placeholder="e.g., Opposite Post Office"
                style={styles.input}
                value={addressForm.landmark || ''}
                onChangeText={value => handleFormInputChange('landmark', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>City:</Text>
              <TextInput
                placeholder="Enter city"
                style={styles.input}
                value={addressForm.city}
                onChangeText={value => handleFormInputChange('city', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>State:</Text>
              <TextInput
                placeholder="Enter state"
                style={styles.input}
                value={addressForm.state}
                onChangeText={value => handleFormInputChange('state', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Pincode:</Text>
              <TextInput
                placeholder="Enter pincode"
                keyboardType="numeric"
                style={styles.input}
                value={addressForm.pincode}
                onChangeText={value => handleFormInputChange('pincode', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>
                Tag (e.g., Home, Work - Optional):
              </Text>
              <TextInput
                placeholder="Home, Work, etc."
                style={styles.input}
                value={addressForm.tag || ''}
                onChangeText={value => handleFormInputChange('tag', value)}
              />
            </View>

            {/* --- Default Address Toggle --- */}
            <View style={styles.toggleContainer}>
              <Text style={styles.label}>Set as Default Address</Text>
              <Switch
                trackColor={{false: '#767577', true: COLORS.buttonBackground}} // Example colors
                thumbColor={isDefault ? COLORS.backgroundPrimary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsDefault}
                value={isDefault}
              />
            </View>

            {/* <View style={styles.formField}>
              <Text style={styles.label}>Latitude (Auto-filled/Manual):</Text>
              <TextInput
                placeholder="Latitude"
                keyboardType="numeric"
                style={styles.input}
                value={addressForm.latitude || ''}
                onChangeText={value => handleFormInputChange('latitude', value)}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Longitude (Auto-filled/Manual):</Text>
              <TextInput
                placeholder="Longitude"
                keyboardType="numeric"
                style={styles.input}
                value={addressForm.longitude || ''}
                onChangeText={value =>
                  handleFormInputChange('longitude', value)
                }
              />
            </View> */}
            {/* TODO: Add a Checkbox for "Set as Default Address" */}
            {addressError && (
              <Text style={styles.errorTextForm}>{addressError}</Text>
            )}
          </View>
        </ScrollView>
        {/* Save Button */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  container: {
    flex: 1,
  },
  header: {
    /* Same as AddressListScreen header */ flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {padding: 5, width: 36, alignItems: 'flex-start'},
  headerTitle: {fontSize: 18, fontWeight: '600', color: COLORS.textPrimary},
  formContainer: {
    flex: 1, // Takes up space between header and save button
  },
  scrollViewContent: {
    paddingBottom: 20, // Space at the end of scroll
  },
  mapSection: {
    height: 150, // Example height for map placeholder area
    backgroundColor: COLORS.mapPlaceholder,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 8,
  },
  mapPlaceholder: {
    /* Same as before */ justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    /* Same as before */ color: COLORS.textSecondary,
    fontSize: 16,
  },
  formFieldsSection: {
    paddingHorizontal: 15,
  },
  formField: {
    /* Same as before */ marginBottom: 15,
  },
  label: {
    /* Same as before */ fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  input: {
    /* Same as before */
    backgroundColor: COLORS.backgroundSecondary, // Changed for form contrast
    borderRadius: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 50,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15, // Match formFieldsSection padding
    paddingVertical: 10, // Add some vertical padding
    marginBottom: 15, // Same as formField
    // Optional: Add a border or different background if desired
    // backgroundColor: COLORS.backgroundSecondary,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: COLORS.border,
  },
  errorTextForm: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  saveButton: {
    /* Similar to addNewButton in AddressListScreen */
    backgroundColor: COLORS.buttonBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    margin: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    /* Similar to addNewButtonText */ color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;
