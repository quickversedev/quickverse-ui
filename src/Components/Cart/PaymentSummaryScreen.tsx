import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckoutScreen from '../Checkout/CheckoutScreen';
import theme from '../../theme';

interface PaymentSummaryScreenProps {
  getTotalPrice: () => number;
}

const PaymentSummaryScreen: React.FC<PaymentSummaryScreenProps> = ({
  getTotalPrice,
}) => {
  const isCartEmpty = getTotalPrice() === 0;
  return (
    <View style={styles.paymentSummary}>
      <Text style={styles.paymentSummaryText}>Payment Summary</Text>
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Order Total</Text>
        <Text style={styles.paymentValue}>Rs.{getTotalPrice()}</Text>
      </View>
      {/* <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Items Discount</Text>
        <Text style={styles.paymentValue}>Rs.0</Text>
      </View>
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Coupon Discount</Text>
        <Text style={styles.paymentValue}>Rs.0</Text>
      </View>
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Shipping</Text>
        <Text style={styles.paymentValue}>Rs.0</Text>
      </View>*/}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>Rs.{getTotalPrice()}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.placeOrderButton,
          {backgroundColor: isCartEmpty ? 'gray' : theme.colors.secondary},
        ]}
        onPress={() => navigation.navigate('CheckoutScreen')}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentSummary: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android
  },
  placeOrderButton: {
    // backgroundColor: isCartEmpty ? 'gray' : theme.colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android
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
