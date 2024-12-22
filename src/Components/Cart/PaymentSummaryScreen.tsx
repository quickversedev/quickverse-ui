import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckoutScreen from '../Checkout/CheckoutScreen';

const PaymentSummaryScreen = ({getTotalPrice, navigation}) => {
  return (
    <View style={styles.paymentSummary}>
      <Text style={styles.paymentSummaryText}>Payment Summary</Text>
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Order Total</Text>
        <Text style={styles.paymentValue}>Rs.{getTotalPrice()}</Text>
      </View>
      <View style={styles.paymentRow}>
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
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>Rs.{getTotalPrice()}</Text>
      </View>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={() => navigation.navigate('CheckoutScreen')}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add the styles used in the payment summary section here
  paymentSummary: {
    backgroundColor: '#fcefb6',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
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
  placeOrderButton: {
    backgroundColor: 'lightgray',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default PaymentSummaryScreen;
