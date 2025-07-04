import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import theme from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Vendors/VendorsNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { Vendor } from '../../utils/canonicalModel';
import { useAuth } from '../../utils/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchUserAddresses, ApiAddress } from '../../services/userAddressSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface PaymentSummaryScreenProps {
  getTotalPrice: {
    productPriceTotal: number;
    totalDiscount: number;
    finalTotal: number;
  };
  vendor: Vendor | undefined;
  isStoreOpened?: boolean;
  isCartEmpty: boolean;
  closeCartModal: () => void;
}

type VendorCardsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebView' | 'AddAddress'
>;

const PaymentSummaryScreen: React.FC<PaymentSummaryScreenProps> = ({
  getTotalPrice,
  vendor,
  isStoreOpened,
  isCartEmpty,
  closeCartModal,
}) => {
  const { vendorEndPoint } = vendor || {};
  const webUrl = vendorEndPoint ? `${vendorEndPoint}/cart` : '';
  const navigation = useNavigation<VendorCardsNavigationProp>();
  const { authData } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressSectionExpanded, setIsAddressSectionExpanded] =
    useState(false);
  const [hasAddress, setHasAddress] = useState<boolean | null>(null);

  const { addresses, loadingList } = useSelector(
    (state: RootState) => state.userAddresses,
  );

  const isPlaceOrderButtonDisabled =
    isCartEmpty || !vendorEndPoint || !isStoreOpened;

  const loadAddresses = useCallback(async (): Promise<boolean> => {
    if (!authData) {
      console.warn('AddressScreen: Auth data not available.');
      return false;
    }

    try {
      setIsLoading(true);
      const resultAction = await dispatch(fetchUserAddresses({ authData }));

      const result = unwrapResult(resultAction);
      return result?.length > 0;
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [authData, dispatch]);
  const showAddressRequiredAlert = useCallback(() => {
    Alert.alert(
      'Address Required',
      'Please add a delivery address before checkout',
      [
        {
          text: 'Add Address',
          onPress: () => {
            navigation.navigate('AddAddress');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  }, []);
  useEffect(() => {
    const checkAddresses = async () => {
      const result = await loadAddresses();
      setHasAddress(result);
      if (!result) {
        showAddressRequiredAlert();
      }
    };

    checkAddresses();
  }, [loadAddresses, navigation]);

  const renderAddressItem = ({ item }: { item: ApiAddress }) => {
    // Concatenate address fields for a compact display
    const addressLine = [
      item.addressLine1,
      item.addressLine2,
      item.addressLine3,
      item.city,
      item.state,
      item.pincode,
    ]
      .filter(Boolean)
      .join(', ');

    return (
      <View style={styles.addressItem}>
        <View style={styles.addressContent}>
          <Text
            style={styles.addressName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name} {item.tag ? `(${item.tag})` : ''}
          </Text>
          <Text
            style={styles.addressLine}
            numberOfLines={2}
            ellipsizeMode="tail">
            {addressLine}
          </Text>
        </View>
      </View>
    );
  };

  const handleProceedToCheckout = async () => {
    if (!authData) {
      Alert.alert('Error', 'Please login to proceed to checkout');
      return;
    }
    if (hasAddress) {
      navigation.navigate('WebView', { url: webUrl });
      closeCartModal();
      return;
    }
    showAddressRequiredAlert();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Address Dropdown Section */}
        <View style={styles.addressSection}>
          <View style={styles.addressDropdownHeader}>
            <Text style={styles.sectionTitle}>
              Available Addresses ({addresses.length}){' '}
            </Text>
            <View style={styles.addressHeaderActions}>
              {addresses.length > 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    setIsAddressSectionExpanded(isAddressSectionExpanded => !isAddressSectionExpanded)
                  }
                  activeOpacity={0.7}
                  style={styles.dropdownIconButton}>
                  <MaterialIcons
                    name={
                      isAddressSectionExpanded
                        ? 'keyboard-arrow-up'
                        : 'keyboard-arrow-down'
                    }
                    size={28}
                    color={theme.colors.secondary}
                  />
                </TouchableOpacity>
              ) : <TouchableOpacity
                style={styles.addAddressHeaderButton}
                onPress={() => navigation.navigate('AddAddress')}
                activeOpacity={0.7}>
                <MaterialIcons
                  name="add"
                  size={22}
                  color={theme.colors.secondary}
                />
                <Text style={styles.addAddressHeaderButtonText}>Add</Text>
              </TouchableOpacity>}
            </View>
          </View>
          {isAddressSectionExpanded && (
            <>
              {loadingList ? (
                <ActivityIndicator size="small" color={theme.colors.secondary} />
              ) : addresses.length > 0 ? (
                <FlatList
                  data={addresses}
                  renderItem={renderAddressItem}
                  keyExtractor={item => item.addressID}
                  scrollEnabled={false}
                  style={styles.addressList}
                />
              ) : (
                <Text style={styles.noAddressText}>No addresses found.</Text>
              )}
              <TouchableOpacity
                style={styles.addAddressHeaderButton}
                onPress={() => navigation.navigate('AddAddress')}
                activeOpacity={0.7}>
                <MaterialIcons
                  name="add"
                  size={22}
                  color={theme.colors.secondary}
                />
                <Text style={styles.addAddressHeaderButtonText}>Add</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Payment Summary Section */}
        <View style={styles.paymentSummary}>
          <Text style={styles.paymentSummaryText}>Payment Summary</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Order Total</Text>
            <Text style={styles.paymentValue}>
              Rs.{getTotalPrice.productPriceTotal}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Order Discount</Text>
            <Text style={styles.paymentValue}>
              - Rs.{getTotalPrice.totalDiscount}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs.{getTotalPrice.finalTotal}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.placeOrderButton,
              {
                backgroundColor: isPlaceOrderButtonDisabled
                  ? 'gray'
                  : theme.colors.secondary,
              },
            ]}
            disabled={isPlaceOrderButtonDisabled || isLoading}
            onPress={handleProceedToCheckout}>
            {isLoading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : (
              <Text style={styles.placeOrderButtonText}>
                Proceed To Checkout
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  addressSection: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  addressDropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addressHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdownIconButton: {
    padding: 4,
  },
  addAddressHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  addAddressHeaderButtonText: {
    color: theme.colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  addressList: {
    marginTop: 10,
  },
  addressItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  addressContent: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  addressLine: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noAddressContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noAddressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  addAddressButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addAddressButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentSummary: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  placeOrderButton: {
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  paymentSummaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  paymentLabel: {
    fontSize: 16,
    color: 'black',
  },
  paymentValue: {
    fontSize: 16,
    color: 'black',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  placeOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default PaymentSummaryScreen;
