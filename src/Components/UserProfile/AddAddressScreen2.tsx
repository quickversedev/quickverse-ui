import React, {useState, useRef} from 'react';
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
import axios from 'axios';

import {AppDispatch, RootState} from '../../store/store';
import {addUserAddress, ApiAddress} from '../../services/userAddressSlice';
import {useAuth} from '../../utils/AuthContext';
import {AddressStackParamList} from './AddressScreen'; // You'll need to update this

const COLORS = {
  backgroundPrimary: '#FAEA7B',
  backgroundSecondary: '#FFF9E6',
  textPrimary: '#4A4A4A',
  textSecondary: '#757575',
  buttonBackground: '#8F1413',
  buttonText: '#FFFFFF',
  border: '#E0B84C',
  iconDefault: '#4A4A4A',
};

type AddressFormScreenRouteProp = RouteProp<
  AddressStackParamList,
  'AddAddressScreen2'
>;
type AddressFormScreenNavigationProp = StackNavigationProp<
  AddressStackParamList,
  'AddAddressScreen2'
>;

interface Props {
  route: AddressFormScreenRouteProp;
  navigation: AddressFormScreenNavigationProp;
}

const AddAddressScreen2: React.FC<Props> = ({route, navigation}) => {
  const {latitude, longitude} = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const {authData} = useAuth();
  const {loadingAdd, error: addressError} = useSelector(
    (state: RootState) => state.userAddresses,
  );

  const [addressForm, setAddressForm] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    state: '',
    pincode: '',
    tag: null,
    // Set latitude and longitude from navigation params
    latitude: latitude.toString(),
    longitude: longitude.toString(),
  });

  const [isDefault, setIsDefault] = useState(true);
  const [isFetchingPincodeDetails, setIsFetchingPincodeDetails] =
    useState(false);

  const pincodeApiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFormInputChange = (name: string, value: string | null) => {
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

  const fetchDetailsFromPincode = async (pinCode: string) => {
    setIsFetchingPincodeDetails(true);
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pinCode}`,
      );
      if (response.data && response.data[0]?.Status === 'Success') {
        const postOfficeInfo = response.data[0].PostOffice[0];
        setAddressForm(prev => ({
          ...prev,
          city: postOfficeInfo.District || prev.city,
          state: postOfficeInfo.State || prev.state,
        }));
      } else {
        Alert.alert('Pincode Error', 'Invalid Pincode or no details found.');
      }
    } catch (error) {
      Alert.alert('API Error', 'Could not fetch details for the pincode.');
    } finally {
      setIsFetchingPincodeDetails(false);
    }
  };

  const handleSaveAddress = () => {
    if (
      !addressForm.name ||
      !addressForm.addressLine1 ||
      !addressForm.addressLine2 ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.pincode
    ) {
      Alert.alert(
        'Validation Error',
        'Please fill all required fields: Name, Address Line 1, City, State, and Pincode.',
      );
      return;
    }

    const newAddressData: Omit<ApiAddress, 'addressID'> = {
      ...addressForm,
      latitude: Number(addressForm.latitude).toFixed(6),
      longitude: Number(addressForm.longitude).toFixed(6),
    };

    dispatch(
      addUserAddress({
        authData: authData!,
        addressData: newAddressData,
        isDefaultAddress: isDefault,
      }),
    )
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Address added successfully!');

        navigation.popToTop();
        navigation.goBack();
        // navigation.pop(2);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.backgroundPrimary}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={26} color={COLORS.iconDefault} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Address Details</Text>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.formFieldsSection}>
            {/* Form fields are the same as before */}
            <View style={styles.formField}>
              <Text style={styles.label}>Contact Name*</Text>
              <TextInput
                value={addressForm.name}
                onChangeText={value => handleFormInputChange('name', value)}
                style={styles.input}
                placeholder="Enter name"
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Address Line 1*</Text>
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
              <Text style={styles.label}>Address Line 2*</Text>
              <TextInput
                value={addressForm.addressLine2}
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
              <Text style={styles.label}>Address Line 3*</Text>
              <TextInput
                value={addressForm.addressLine3}
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
              <Text style={styles.label}>Pincode*</Text>
              <View style={styles.pincodeInputContainer}>
                <TextInput
                  value={addressForm.pincode}
                  onChangeText={value =>
                    handleFormInputChange('pincode', value)
                  }
                  style={styles.pincodeInput}
                  placeholder="6-digit pincode"
                  keyboardType="numeric"
                  maxLength={6}
                />
                {isFetchingPincodeDetails && (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.buttonBackground}
                  />
                )}
              </View>
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>City*</Text>
              <TextInput
                value={addressForm.city}
                onChangeText={value => handleFormInputChange('city', value)}
                style={styles.input}
                editable={!isFetchingPincodeDetails}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>State*</Text>
              <TextInput
                value={addressForm.state}
                onChangeText={value => handleFormInputChange('state', value)}
                style={styles.input}
                editable={!isFetchingPincodeDetails}
              />
            </View>
            <View style={styles.formField}>
              <Text style={styles.label}>Tag (e.g., Home, Work)</Text>
              <TextInput
                value={addressForm.tag || ''}
                onChangeText={value => handleFormInputChange('tag', value)}
                style={styles.input}
                placeholder="Optional"
              />
            </View>
            <View style={styles.toggleContainer}>
              <Text style={styles.labelToggle}>Set as Default Address</Text>
              <Switch
                value={isDefault}
                onValueChange={setIsDefault}
                trackColor={{false: '#767577', true: COLORS.buttonBackground}}
                thumbColor={isDefault ? COLORS.backgroundPrimary : '#f4f3f4'}
              />
            </View>
            {addressError && (
              <Text style={styles.errorTextForm}>{addressError}</Text>
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
            <ActivityIndicator color={COLORS.buttonText} />
          ) : (
            <Text style={styles.saveButtonText}>Save Address</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
  backButton: {padding: 5},
  headerTitle: {fontSize: 18, fontWeight: '600', color: COLORS.textPrimary},
  backButtonPlaceholder: {width: 40},
  formContainer: {flex: 1, backgroundColor: '#FFFFFF'},
  scrollViewContent: {paddingBottom: 20, paddingHorizontal: 20, paddingTop: 20},
  formFieldsSection: {},
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
  pincodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 8,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingRight: 10,
  },
  pincodeInput: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 48,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
  },
  labelToggle: {fontSize: 15, color: COLORS.textPrimary},
  errorTextForm: {color: 'red', textAlign: 'center', marginTop: 10},
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
  saveButtonDisabled: {backgroundColor: 'grey'},
  saveButtonText: {color: COLORS.buttonText, fontSize: 16, fontWeight: 'bold'},
});

export default AddAddressScreen2;
