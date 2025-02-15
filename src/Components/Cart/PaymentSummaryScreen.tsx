import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Vendors/VendorsNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {Vendor} from '../../utils/canonicalModel';

interface PaymentSummaryScreenProps {
  getTotalPrice: {
    productPriceTotal: number;
    totalDiscount: number;
    finalTotal: number;
  };
  vendor: Vendor | undefined;
  isStoreOpened?: boolean;
  isCartEmpty: boolean;
}

type VendorCardsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebView'
>;

const PaymentSummaryScreen: React.FC<PaymentSummaryScreenProps> = ({
  getTotalPrice,
  vendor,
  isStoreOpened,
  isCartEmpty,
}) => {
  const {vendorEndPoint} = vendor || {};
  const webUrl = vendorEndPoint ? `${vendorEndPoint}/cart` : '';
  const navigation = useNavigation<VendorCardsNavigationProp>();
  const isPlaceOrderButtonDisabled =
    isCartEmpty || !vendorEndPoint || !isStoreOpened;
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
          disabled={isPlaceOrderButtonDisabled}
          onPress={() => navigation.navigate('WebView', {url: webUrl})}>
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 20,
    // backgroundColor: theme.colors.background,
  },
  paymentSummary: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
