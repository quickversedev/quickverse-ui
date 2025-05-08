import React, {useState, useEffect, useMemo} from 'react';
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
import {AppDispatch, RootState} from '../../store/store';
import {
  fetchUserAddresses,
  addUserAddress,
  ApiAddress,
  ListedAddress,
} from '../../services/useAddressSlice';
import {useAuth} from '../../utils/AuthContext';

const COLORS = {
  backgroundPrimary: '#FAEA7B',
  backgroundSecondary: '#FFF9E6',
  textPrimary: '#4A4A4A',
  textSecondary: '#757575',
  buttonBackground: '#8F1413',
  buttonText: '#FFFFFF',
  border: '#E0B84C',
  iconDefault: '#4A4A4A',
  iconLight: '#757575',
  mapPlaceholder: '#E0E0E0',
};

interface AddressFormState
  extends Omit<ApiAddress, 'id' | 'latitude' | 'longitude'> {
  houseNo: string;
  floor: string;
  towerBlock: string;
  landmark: string;
  // These will be needed when saving, but for now, we are not getting them from map
  latitude?: string;
  longitude?: string;
}

const AddressScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {authData} = useAuth(); // Get auth data ( vendorId)

  // Select state from Redux store
  const {
    addresses,
    loadingList,
    loadingAdd,
    error: addressError,
  } = useSelector((state: RootState) => state.address);

  const [isAddingDetails, setIsAddingDetails] = useState(false);

  // Form state for adding a new address
  const [addressForm, setAddressForm] = useState<AddressFormState>({
    name: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: null,
    city: '',
    state: '',
    pincode: '',
    tag: '',
    houseNo: '',
    floor: '',
    towerBlock: '',
    landmark: '',
    latitude: '',
    longitude: '',
  });

  console.log('AUTH_DATA::', authData);

  // Fetch addresses when the component mounts or authData changes
  useEffect(() => {
    if (authData) {
      dispatch(
        fetchUserAddresses({
          authData: authData,
          vendorId: '8765',
        }),
      );
    } else {
      // Handle case where authData is not available (e.g., show login prompt or error)
      console.warn(
        'AddressScreen: Auth data not available to fetch addresses.',
      );
    }
  }, [dispatch, authData]);

  // Determine the address to display in the "Delivering to" card
  const deliveringToAddress = useMemo(() => {
    if (addresses && addresses.length > 0) {
      // Prioritize default address, otherwise take the first one
      return addresses.find(addr => addr.isDefaultAddress) || addresses[0];
    }
    return null;
  }, [addresses]);

  // Handler for form input changes
  const handleFormInputChange = (
    name: keyof AddressFormState,
    value: string,
  ) => {
    setAddressForm(prev => ({...prev, [name]: value}));
  };

  // Handler for the main action button press
  const handleActionPress = () => {
    if (isAddingDetails) {
      // --- Save Address Logic ---
      if (!authData) {
        Alert.alert(
          'Error',
          'Authentication details missing. Cannot save address.',
        );
        return;
      }
      // Basic validation (enhance as needed)
      if (
        !addressForm.name ||
        !addressForm.addressLine1 ||
        !addressForm.city ||
        !addressForm.state ||
        !addressForm.pincode
      ) {
        Alert.alert(
          'Validation Error',
          'Please fill in all required address fields (Name, Address Line 1, City, State, Pincode).',
        );
        return;
      }

      const newAddressData: Omit<ApiAddress, 'id'> = {
        name: addressForm.name,
        addressLine1: `${
          addressForm.houseNo ? addressForm.houseNo + ', ' : ''
        }${addressForm.addressLine1}`,
        addressLine2: addressForm.addressLine2 || null,
        addressLine3: addressForm.addressLine3 || null,
        city: addressForm.city,
        state: addressForm.state,
        pincode: addressForm.pincode,
        latitude: addressForm.latitude || '0',
        longitude: addressForm.longitude || '0',
        tag: addressForm.tag || null,
      };

      console.log('PAYLOAD:', newAddressData);

      dispatch(
        addUserAddress({
          authData: authData,
          vendorId: '8765',
          addressData: newAddressData,
          isDefaultAddress: false, // Or get this from a form checkbox
        }),
      )
        .unwrap() // Allows handling promise result directly
        .then(addedAddress => {
          Alert.alert(
            'Success',
            `Address "${addedAddress.name}" added successfully!`,
          );
          setIsAddingDetails(false); // Close the form
        })
        .catch(errMessage => {
          Alert.alert('Error', errMessage || 'Failed to add address.');
        });
    } else {
      // --- Switch to Add Address Form ---
      // Pre-fill parts of the form if a current address is selected (optional)
      if (deliveringToAddress) {
        setAddressForm({
          name: deliveringToAddress.name || '',
          addressLine1: deliveringToAddress.addressLine1 || '',
          addressLine2: deliveringToAddress.addressLine2 || '',
          addressLine3: deliveringToAddress.addressLine3 || null,
          city: deliveringToAddress.city || '',
          state: deliveringToAddress.state || '',
          pincode: deliveringToAddress.pincode || '',
          tag: deliveringToAddress.tag || '',
          houseNo: '', // These would be new details
          floor: '',
          towerBlock: '',
          landmark: '',
          latitude: deliveringToAddress.latitude, // Pre-fill if available
          longitude: deliveringToAddress.longitude,
        });
      } else {
        // Reset form if no current address
        setAddressForm({
          name: '',
          addressLine1: '',
          addressLine2: '',
          addressLine3: null,
          city: '',
          state: '',
          pincode: '',
          tag: '',
          houseNo: '',
          floor: '',
          towerBlock: '',
          landmark: '',
          latitude: '',
          longitude: '',
        });
      }
      setIsAddingDetails(true);
    }
  };

  const handleBackPress = () => {
    console.log('Back pressed');
    // TODO: navigation.goBack();
  };

  const handleCloseCard = () => {
    if (isAddingDetails) {
      setIsAddingDetails(false);
    } else {
      console.log("Close 'Delivering To' pressed");
      // TODO: Logic if user can deselect current address
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
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={26} color={COLORS.iconDefault} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Delivery Address</Text>
          <View style={styles.backButton} />
        </View>

        {/* --- Search Bar --- */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Location"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.searchInput}
          />
          <Icon
            name="search"
            size={22}
            color={COLORS.iconDefault}
            style={styles.searchIcon}
          />
        </View>

        {/* --- Map Area (Placeholder - NOT TOUCHED) --- */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map View Placeholder</Text>
          </View>

          {/* --- Address Details Form OVER the map --- */}
          {isAddingDetails && (
            <ScrollView
              style={[styles.cardBase, styles.addressFormCard]}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Address Details</Text>
                <TouchableOpacity
                  onPress={handleCloseCard}
                  style={styles.closeButton}>
                  <Icon
                    name="close-circle"
                    size={24}
                    color={COLORS.iconDefault}
                  />
                </TouchableOpacity>
              </View>

              {/* Form Fields - Bind to addressForm state */}
              <View style={styles.formField}>
                <Text style={styles.label}>Contact Name:</Text>
                <TextInput
                  placeholder="Contact Name"
                  style={styles.input}
                  value={addressForm.name}
                  onChangeText={value => handleFormInputChange('name', value)}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>House No, Building Name:</Text>
                <TextInput
                  placeholder="House No, Building Name"
                  style={styles.input}
                  value={addressForm.houseNo}
                  onChangeText={value =>
                    handleFormInputChange('houseNo', value)
                  }
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>Street Address / Area:</Text>
                <TextInput
                  placeholder="Street Address / Area"
                  style={styles.input}
                  value={addressForm.addressLine1}
                  onChangeText={value =>
                    handleFormInputChange('addressLine1', value)
                  }
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>
                  Locality / Sub-Area (Optional):
                </Text>
                <TextInput
                  placeholder="Locality / Sub-Area"
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
                  value={addressForm.floor}
                  onChangeText={value => handleFormInputChange('floor', value)}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>Tower / Block (Optional):</Text>
                <TextInput
                  placeholder="e.g., Tower A, Block B"
                  style={styles.input}
                  value={addressForm.towerBlock}
                  onChangeText={value =>
                    handleFormInputChange('towerBlock', value)
                  }
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>Landmark (Optional):</Text>
                <TextInput
                  placeholder="Nearby Landmark"
                  style={styles.input}
                  value={addressForm.landmark}
                  onChangeText={value =>
                    handleFormInputChange('landmark', value)
                  }
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>City:</Text>
                <TextInput
                  placeholder="City"
                  style={styles.input}
                  value={addressForm.city}
                  onChangeText={value => handleFormInputChange('city', value)}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>State:</Text>
                <TextInput
                  placeholder="State"
                  style={styles.input}
                  value={addressForm.state}
                  onChangeText={value => handleFormInputChange('state', value)}
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>Pincode:</Text>
                <TextInput
                  placeholder="Pincode"
                  keyboardType="numeric"
                  style={styles.input}
                  value={addressForm.pincode}
                  onChangeText={value =>
                    handleFormInputChange('pincode', value)
                  }
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.label}>
                  Tag (e.g., Home, Work - Optional):
                </Text>
                <TextInput
                  placeholder="Home, Work, Other"
                  style={styles.input}
                  value={addressForm.tag || ''}
                  onChangeText={value => handleFormInputChange('tag', value)}
                />
              </View>
              {/* Latitude and Longitude are not part of this form directly (would come from map) */}
            </ScrollView>
          )}
        </View>

        {/* --- Delivering To Card (Bottom Section) --- */}
        {!isAddingDetails && (
          <View style={[styles.cardBase, styles.deliveringToCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Delivering to</Text>
              <TouchableOpacity
                onPress={handleCloseCard}
                style={styles.closeButton}>
                <Icon
                  name="close-circle"
                  size={24}
                  color={COLORS.iconDefault}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.addressRow}>
              {loadingList ? (
                <ActivityIndicator
                  size="small"
                  color={COLORS.textPrimary}
                  style={{flex: 1}}
                />
              ) : deliveringToAddress ? (
                <Text style={styles.addressText}>
                  {`${
                    deliveringToAddress.name
                      ? deliveringToAddress.name + '\n'
                      : ''
                  }`}
                  {`${deliveringToAddress.addressLine1}`}
                  {deliveringToAddress.addressLine2
                    ? `\n${deliveringToAddress.addressLine2}`
                    : ''}
                  {`\n${deliveringToAddress.city}, ${deliveringToAddress.state} - ${deliveringToAddress.pincode}`}
                  {deliveringToAddress.tag
                    ? ` (${deliveringToAddress.tag})`
                    : ''}
                </Text>
              ) : addressError ? (
                <Text style={[styles.addressText, {color: 'red'}]}>
                  {addressError}
                </Text>
              ) : (
                <Text style={styles.addressText}>
                  No addresses found. Tap below to add.
                </Text>
              )}
              {!loadingList && deliveringToAddress && (
                <TouchableOpacity
                  onPress={() => console.log('Change address pressed')}>
                  <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* --- Action Button --- */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleActionPress}
          disabled={loadingAdd || (isAddingDetails && loadingList)} // Disable if adding or list is loading when form is open
        >
          {loadingAdd ? (
            <ActivityIndicator color={COLORS.buttonText} size="small" />
          ) : (
            <Text style={styles.actionButtonText}>
              {isAddingDetails ? 'Save Address Details' : 'Add Address Details'}
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.backgroundPrimary,
  },
  backButton: {
    padding: 5,
    width: 36,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  searchIcon: {
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: COLORS.mapPlaceholder,
    position: 'relative',
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mapPlaceholder,
  },
  mapPlaceholderText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  cardBase: {
    backgroundColor: COLORS.backgroundSecondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 15,
  },
  deliveringToCard: {
    marginHorizontal: 15,
    marginBottom: 0,
  },
  addressFormCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '70%',
    marginHorizontal: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  closeButton: {
    padding: 5,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 40, // Ensure space for loader or text
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
    marginRight: 10,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.buttonBackground,
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.backgroundPrimary,
    borderRadius: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 50,
  },
  actionButton: {
    backgroundColor: COLORS.buttonBackground,
    borderRadius: 15,
    paddingVertical: 18,
    marginHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  actionButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
