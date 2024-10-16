// src/components/CartButton.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../theme';

interface CartButtonProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onAdd: () => void;
  added: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ quantity, onIncrease, onDecrease, onAdd, added }) => {
  return (
    <View style={styles.cartButtonContainer}>
      {added ? (
        <View style={styles.quantityContainer}>
          <Pressable onPress={onDecrease} style={styles.iconButton}>
            <MaterialCommunityIcons name="minus" size={20} color={theme.colors.primary} />
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable onPress={onIncrease} style={styles.iconButton}>
            <MaterialCommunityIcons name="plus" size={20} color={theme.colors.primary} />
          </Pressable>
        </View>
      ) : (
        <Pressable onPress={onAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>ADD</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: 50,
    marginTop: 50,
    marginRight: 27,
  },
  addButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    height: 30,
    width: 70,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    height: 30,
    width: 70,
  },
  iconButton: {
    paddingHorizontal: 5,
  },
  quantityText: {
    marginHorizontal: 2,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartButton;
