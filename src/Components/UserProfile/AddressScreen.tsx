import React, {useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './profileNavigation';

import {AppDispatch, RootState} from '../../store/store';
import {
  fetchUserAddresses,
  ListedAddress,
} from '../../services/userAddressSlice';
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
};

export type AddressStackParamList = {
  AddressList: undefined; // This screen
  AddAddressScreen: {addressId?: string}; // Screen for adding/editing
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen' // Current screen's name in the stack (optional but good practice)
>;

const AddressScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {authData} = useAuth();

  const {
    addresses,
    defaultAddressId,
    loadingList,
    error: addressError,
  } = useSelector((state: RootState) => state.userAddresses);

  console.log('addresses in addressScreen:', addresses);

  const loadAddresses = useCallback(() => {
    if (authData) {
      dispatch(
        fetchUserAddresses({
          authData: authData,
          vendorId: '8765',
        }),
      );
    } else {
      console.warn('AddressScreen: Auth data not available.');
    }
  }, [dispatch, authData]);

  useEffect(() => {
    // Fetch addresses when the screen focuses (e.g., after coming back from add/edit)
    const unsubscribe = navigation.addListener('focus', () => {
      loadAddresses();
    });
    // Also load on initial mount if authData is present
    loadAddresses();
    return unsubscribe; // Cleanup listener on unmount
  }, [navigation, loadAddresses]);

  const renderAddressItem = ({item}: {item: ListedAddress}) => (
    <TouchableOpacity style={styles.addressItemContainer}>
      {defaultAddressId === item.id && (
        <Text style={styles.defaultToggle}>Default</Text>
      )}

      <View style={styles.addressItemContent}>
        <Text style={styles.addressName}>
          {item?.address?.name}{' '}
          {item?.address?.tag ? `(${item?.address?.tag})` : ''}
          {item.isDefaultAddress && (
            <Text style={styles.defaultTag}> (Default)</Text>
          )}
        </Text>
        <Text style={styles.addressLine}>{item?.address?.addressLine1}</Text>
        {item?.address?.addressLine2 && (
          <Text style={styles.addressLine}>{item?.address?.addressLine2}</Text>
        )}
        {item?.address?.addressLine3 && (
          <Text style={styles.addressLine}>{item?.address?.addressLine3}</Text>
        )}
        <Text style={styles.addressLine}>
          {item?.address?.city}, {item?.address?.state} -{' '}
          {item?.address?.pincode}
        </Text>
      </View>

      {/* TODO: Add Edit/Delete buttons here if needed */}
    </TouchableOpacity>
  );

  const handleAddNewAddress = () => {
    navigation.navigate('AddAddressScreen');
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
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={26} color={COLORS.iconDefault} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Addresses</Text>
          <View style={styles.backButton} />
        </View>

        {/* Error Display */}
        {addressError && !loadingList && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{addressError}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadAddresses}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading Indicator */}
        {loadingList && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.buttonBackground} />
          </View>
        )}

        {/* Address List */}
        {!loadingList && !addressError && (
          <FlatList
            data={addresses}
            renderItem={renderAddressItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>
                  No addresses saved yet.
                </Text>
                <Text style={styles.emptyListSubText}>
                  Add your first address to get started!
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContentContainer}
            style={styles.container} // Ensure FlatList takes available space
          />
        )}

        {/* Add New Address Button */}
        <TouchableOpacity
          style={styles.addNewButton}
          onPress={handleAddNewAddress}>
          <Icon
            name="add-circle-outline"
            size={24}
            color={COLORS.buttonText}
            style={styles.addIcon}
          />
          <Text style={styles.addNewButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.backgroundPrimary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: COLORS.buttonText,
    fontWeight: 'bold',
  },
  listContentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addressItemContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  defaultToggle: {
    position: 'absolute',
    top: 6,
    right: 8,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    // fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  addressItemContent: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
    maxWidth: '90%',
  },
  defaultTag: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'green',
  },
  addressLine: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptyListSubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  addNewButton: {
    backgroundColor: COLORS.buttonBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    margin: 15,
    borderRadius: 8,
  },
  addIcon: {marginRight: 8},
  addNewButtonText: {
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
