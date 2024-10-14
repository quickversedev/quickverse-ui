import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CartButton = () => {
  const [quantity, setQuantity] = useState(0);

  // Function to handle increment
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decrement
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.borderedContainer, { backgroundColor: quantity > 0 ? '#8F1413' : 'green' }]}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{quantity}</Text>

        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 60,
    marginBottom: 5,
  },
  borderedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5, // Reduced border width
    borderColor: '#8F1413',
    borderRadius: 25, // Reduced border radius
    padding: 4, // Added padding to adjust the overall size
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 12, // Reduced radius
    width: 24, // Reduced width
    height: 24, // Reduced height
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontSize: 16, // Reduced font size
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16, // Reduced font size
    fontWeight: 'bold',
    marginHorizontal: 5, // Reduced margin
    color: '#fff',
  },
});

export default CartButton;
