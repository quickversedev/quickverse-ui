// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
//   SafeAreaView,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import theme from '../../theme';
// import {useNavigation} from '@react-navigation/native';
// import {RootStackParamList} from '../Vendors/VendorsNavigator';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {Vendor} from '../../utils/canonicalModel';
// import axios from 'axios';
// import {useAuth} from '../../utils/AuthContext';

// interface PaymentSummaryScreenProps {
//   getTotalPrice: {
//     productPriceTotal: number;
//     totalDiscount: number;
//     finalTotal: number;
//   };
//   vendor: Vendor | undefined;
//   isStoreOpened?: boolean;
//   isCartEmpty: boolean;
//   closeCartModal: () => void;
// }

// type VendorCardsNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'WebView' | 'AddAddress'
// >;

// const PaymentSummaryScreen: React.FC<PaymentSummaryScreenProps> = ({
//   getTotalPrice,
//   vendor,
//   isStoreOpened,
//   isCartEmpty,
//   closeCartModal,
// }) => {
//   const {vendorEndPoint} = vendor || {};
//   const webUrl = vendorEndPoint ? `${vendorEndPoint}/cart` : '';
//   const navigation = useNavigation<VendorCardsNavigationProp>();
//   const {authData} = useAuth();
//   const [isLoading, setIsLoading] = useState(false);

//   const isPlaceOrderButtonDisabled =
//     isCartEmpty || !vendorEndPoint || !isStoreOpened;

//   const checkUserAddress = async () => {
//     if (!authData) return false;

//     try {
//       setIsLoading(true);
//       const response = await axios.get(
//         `YOUR_API_ENDPOINT_TO_CHECK_ADDRESS`, // Replace with your actual endpoint
//         {
//           headers: {
//             Authorization: `Bearer 3123132545456546`,
//           },
//         },
//       );
//       return response.data.hasAddress; // Assuming API returns {hasAddress: boolean}
//     } catch (error) {
//       console.error('Error checking address:', error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleProceedToCheckout = async () => {
//     if (!authData) {
//       Alert.alert('Error', 'Please login to proceed to checkout');
//       return;
//     }

//     const hasAddress = await checkUserAddress();

//     if (!hasAddress) {
//       Alert.alert(
//         'Address Required',
//         'Please add a delivery address before checkout',
//         [
//           {
//             text: 'Add Address',
//             onPress: () => {
//               closeCartModal();
//               navigation.navigate('AddAddress'); // Make sure this matches your navigator
//             },
//           },
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//         ],
//       );
//       return;
//     }

//     // If address exists, proceed to checkout
//     navigation.navigate('WebView', {url: webUrl});
//     closeCartModal();
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.paymentSummary}>
//         <Text style={styles.paymentSummaryText}>Payment Summary</Text>
//         <View style={styles.paymentRow}>
//           <Text style={styles.paymentLabel}>Order Total</Text>
//           <Text style={styles.paymentValue}>
//             Rs.{getTotalPrice.productPriceTotal}
//           </Text>
//         </View>
//         <View style={styles.paymentRow}>
//           <Text style={styles.paymentLabel}>Order Discount</Text>
//           <Text style={styles.paymentValue}>
//             - Rs.{getTotalPrice.totalDiscount}
//           </Text>
//         </View>
//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total</Text>
//           <Text style={styles.totalValue}>Rs.{getTotalPrice.finalTotal}</Text>
//         </View>
//         <TouchableOpacity
//           style={[
//             styles.placeOrderButton,
//             {
//               backgroundColor: isPlaceOrderButtonDisabled
//                 ? 'gray'
//                 : theme.colors.secondary,
//             },
//           ]}
//           disabled={isPlaceOrderButtonDisabled || isLoading}
//           onPress={handleProceedToCheckout}>
//           {isLoading ? (
//             <ActivityIndicator color={theme.colors.primary} />
//           ) : (
//             <Text style={styles.placeOrderButtonText}>Proceed To Checkout</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     marginBottom: 20,
//     // backgroundColor: theme.colors.background,
//   },
//   paymentSummary: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 15,
//     marginTop: 20,
//     marginHorizontal: 15,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: {width: 0, height: 4},
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   placeOrderButton: {
//     padding: 15,
//     borderRadius: 15,
//     marginTop: 20,
//     alignItems: 'center',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: {width: 0, height: 4},
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   paymentSummaryText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//     marginBottom: 10,
//   },
//   paymentRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 5,
//   },
//   paymentLabel: {
//     fontSize: 16,
//     color: 'black',
//   },
//   paymentValue: {
//     fontSize: 16,
//     color: 'black',
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   totalLabel: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   totalValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   placeOrderButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//   },
// });

// export default PaymentSummaryScreen;
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Vendors/VendorsNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {Vendor} from '../../utils/canonicalModel';
import {useAuth} from '../../utils/AuthContext';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../store/store';
import {fetchUserAddresses} from '../../services/userAddressSlice';
import {unwrapResult} from '@reduxjs/toolkit';

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
  const {vendorEndPoint} = vendor || {};
  const webUrl = vendorEndPoint ? `${vendorEndPoint}/cart` : '';
  const navigation = useNavigation<VendorCardsNavigationProp>();
  const {authData} = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const isPlaceOrderButtonDisabled =
    isCartEmpty || !vendorEndPoint || !isStoreOpened;

  const loadAddresses = useCallback(async (): Promise<boolean> => {
    if (!authData) {
      console.warn('AddressScreen: Auth data not available.');
      return false;
    }

    try {
      setIsLoading(true);
      const resultAction = await dispatch(fetchUserAddresses({authData}));

      const result = unwrapResult(resultAction);
      return result?.length > 0;
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [authData, dispatch]);
  useEffect(() => {
    const checkAddresses = async () => {
      const hasAddress = await loadAddresses();

      if (!hasAddress) {
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
      }
    };

    checkAddresses(); // Call the async wrapper
  }, [loadAddresses, navigation]);
  const handleProceedToCheckout = async () => {
    if (!authData) {
      Alert.alert('Error', 'Please login to proceed to checkout');
      return;
    }

    navigation.navigate('WebView', {url: webUrl});
    closeCartModal();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <Text style={styles.placeOrderButtonText}>Proceed To Checkout</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 20,
  },
  paymentSummary: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
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
        shadowOffset: {width: 0, height: 4},
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
