import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const CartListScreen = ({ cartItems, handleIncrement, handleDecrement }) => {

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
        <Text style={styles.itemPrice}>Rs.{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={[styles.quantityButton, styles.decrementButton]} 
          onPress={() => handleDecrement(item.id)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity 
          style={[styles.quantityButton, styles.incrementButton]} 
          onPress={() => handleIncrement(item.id)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={cartItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.cartList}
    />
  );
};

const styles = StyleSheet.create({
  // Add the styles used in the cart list section here
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fcefb6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  itemRestaurant: {
    fontSize: 14,
    color: 'black',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  decrementButton: {
    backgroundColor: 'red',
  },
  incrementButton: {
    backgroundColor: 'green',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
  },
  quantity: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartList: {
    marginVertical: 20,
  },
});

export default CartListScreen;
