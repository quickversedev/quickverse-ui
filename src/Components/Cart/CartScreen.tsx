import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CartListScreen from '../Cart/CartListScreen';
import PaymentSummaryScreen from '../Cart/PaymentSummaryScreen';

const initialCartItems = [
  {
    id: '1',
    name: 'Hakka Noodles',
    restaurant: 'Paaji Ki Rasoi',
    price: 140,
    quantity: 1,
    image: 'https://via.placeholder.com/50', // Replace with actual image URL
  },
  {
    id: '2',
    name: 'Veg Biryani',
    restaurant: 'Paaji Ki Rasoi',
    price: 120,
    quantity: 1,
    image: 'https://via.placeholder.com/50', // Replace with actual image URL
  },
];

const CartScreen = ({navigation}) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleIncrement = (itemId: string) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
    );
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId: string) => {
    const updatedCartItems = cartItems
      .map(item =>
        item.id === itemId ? {...item, quantity: item.quantity - 1} : item,
      )
      .filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <View style={styles.cartHeader}>
        <Text style={styles.subHeader}>
          {cartItems.length} Items in your cart
        </Text>
        <TouchableOpacity
          style={styles.addMoreButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.addMoreButtonText}>+ Add more</Text>
        </TouchableOpacity>
      </View>
      <CartListScreen
        cartItems={cartItems}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
      <PaymentSummaryScreen
        getTotalPrice={getTotalPrice}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Add the shared styles here
  container: {
    flex: 1,
    backgroundColor: '#FFDC52',
    padding: 20,
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'darkblue',
    marginBottom: 5,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  subHeader: {
    fontSize: 18,
    color: 'darkblue',
  },
  addMoreButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  addMoreButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
