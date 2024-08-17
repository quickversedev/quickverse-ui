import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton, Button, TextInput } from 'react-native-paper';

const CheckoutScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState('Home');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <Text style={styles.subheader}>2 Items in your cart</Text>
      <Text style={styles.total}>TOTAL</Text>
      <Text style={styles.totalAmount}>Rs.185.00</Text>

      <Text style={styles.sectionTitle}>Delivery Address</Text>
      
      {/* Home Address */}
      <TouchableOpacity 
        style={[styles.addressContainer, selectedAddress === 'Home' && styles.selectedAddress]} 
        onPress={() => setSelectedAddress('Home')}
      >
        <RadioButton
          value="Home"
          status={ selectedAddress === 'Home' ? 'checked' : 'unchecked' }
          onPress={() => setSelectedAddress('Home')}
          color="#A92C2E"
        />
        <View>
          <Text style={styles.addressTitle}>Home</Text>
          <Text style={styles.addressText}>(205) 555-024</Text>
          <Text style={styles.addressText}>1786 Wheeler Bridge</Text>
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <Text>✎</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Office Address */}
      <TouchableOpacity 
        style={[styles.addressContainer, selectedAddress === 'Office' && styles.selectedAddress]} 
        onPress={() => setSelectedAddress('Office')}
      >
        <RadioButton
          value="Office"
          status={ selectedAddress === 'Office' ? 'checked' : 'unchecked' }
          onPress={() => setSelectedAddress('Office')}
          color="#A92C2E"
        />
        <View>
          <Text style={styles.addressTitle}>Office</Text>
          <Text style={styles.addressText}>(205) 555-024</Text>
          <Text style={styles.addressText}>1786 w Dallas St underfield</Text>
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <Text>✎</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addAddressButton}>
        <Text style={styles.addAddressText}>+ Add Address</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Payment method</Text>
      
      {/* Payment Method */}
      <TouchableOpacity 
        style={[styles.paymentContainer, paymentMethod === 'Cash on Delivery' && styles.selectedAddress]} 
        onPress={() => setPaymentMethod('Cash on Delivery')}
      >
        <View style={styles.paymentMethodIcon}>
          <Text>💳</Text>
        </View>
        <Text style={styles.paymentMethodText}>Cash on Delivery</Text>
        <RadioButton
          value="Cash on Delivery"
          status={ paymentMethod === 'Cash on Delivery' ? 'checked' : 'unchecked' }
          onPress={() => setPaymentMethod('Cash on Delivery')}
          color="#A92C2E"
        />
      </TouchableOpacity>

      <Button mode="contained" style={styles.placeOrderButton} onPress={() => {}}>
        Place Order
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8CF41',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A92C2E',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 18,
    color: '#A92C2E',
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A92C2E',
    alignSelf: 'flex-end',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A92C2E',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginVertical: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFEB3B',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedAddress: {
    borderColor: '#A92C2E',
    borderWidth: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
  },
  addressText: {
    fontSize: 14,
    color: '#263238',
  },
  editIcon: {
    marginLeft: 'auto',
  },
  addAddressButton: {
    alignItems: 'center',
    marginVertical: 8,
  },
  addAddressText: {
    fontSize: 16,
    color: '#263238',
    textDecorationLine: 'underline',
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFEB3B',
    borderRadius: 8,
    marginBottom: 16,
  },
  paymentMethodIcon: {
    marginRight: 8,
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#263238',
    flex: 1,
  },
  placeOrderButton: {
    backgroundColor: '#A92C2E',
  },
});

export default CheckoutScreen;
