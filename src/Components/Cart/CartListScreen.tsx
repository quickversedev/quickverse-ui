import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../theme';
import {ProductCartItems} from '../../utils/canonicalModel';

interface CartItem {
  id: string;
  image: string;
  name: string;
  restaurant: string;
  price: number;
  quantity: number;
}

interface CartListScreenProps {
  cartItems: ProductCartItems[];
  handleIncrement: (id: string) => void;
  handleDecrement: (id: string) => void;
  handleDelete: (id: string) => void;
}

const CartListScreen: React.FC<CartListScreenProps> = ({
  cartItems,
  handleIncrement,
  handleDecrement,
  handleDelete,
}) => {
  const renderItem = ({item}: {item: ProductCartItems}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs.{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.quantityButton, styles.decrementButton]}
          onPress={() => handleDecrement(item.id)}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={[styles.quantityButton, styles.incrementButton]}
          onPress={() => handleIncrement(item.id)}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}>
        <MaterialCommunityIcons
          name="delete"
          size={24}
          color={theme.colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={cartItems}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      style={styles.cartList}
      nestedScrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fcefb6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    position: 'relative',
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
    // alignItems: 'center',
    marginTop: 35,
  },
  quantityButton: {
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  decrementButton: {
    backgroundColor: theme.colors.secondary,
  },
  incrementButton: {
    backgroundColor: 'green',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
  },
  quantity: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartList: {
    marginVertical: 20,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CartListScreen;
