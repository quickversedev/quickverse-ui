import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LaundryProduct} from '../../utils/canonicalModel';
import {CartItem} from '../../services/cartSlice';
import theme from '../../theme';
import styles from './styles';
interface LaundryItemProps {
  item: LaundryProduct;
  cartItem: CartItem | undefined;
  addItemToCart: (item: LaundryProduct) => void;
  removeItemFromCart: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  handleCheckboxChange: (
    cartItem: CartItem,
    service: 'ironing' | 'washing',
  ) => void;
}

const LaundryItem: React.FC<LaundryItemProps> = ({
  item,
  cartItem,
  addItemToCart,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  handleCheckboxChange,
}) => (
  <Pressable style={styles.itemContainer}>
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: item.imageUrl}} />
    </View>
    <View style={styles.detailsContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.priceSection}>
        <Pressable
          onPress={() => cartItem && handleCheckboxChange(cartItem, 'washing')}>
          <MaterialCommunityIcons
            name={
              cartItem?.isWashingSelected
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            size={24}
            color={theme.colors.secondary}
          />
        </Pressable>
        <Text style={styles.itemPrice}>{`Washing: ${item.price}Rs.`}</Text>

        <Pressable
          onPress={() => cartItem && handleCheckboxChange(cartItem, 'ironing')}>
          <MaterialCommunityIcons
            name={
              cartItem?.isIroningSelected
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            size={24}
            color={theme.colors.secondary}
          />
        </Pressable>
        <Text style={styles.itemPrice}>{`Ironing: ${item.ironRate}Rs.`}</Text>
      </View>

      {cartItem ? (
        <>
          <View style={styles.quantityContainer}>
            <Pressable onPress={() => decreaseQuantity(cartItem)}>
              <Text style={styles.quantityButton}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            <Pressable onPress={() => increaseQuantity(cartItem)}>
              <Text style={styles.quantityButton}>+</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.deleteIcon}
            onPress={() => removeItemFromCart(item)}>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color={theme.colors.secondary}
            />
          </Pressable>
        </>
      ) : (
        <Pressable onPress={() => addItemToCart(item)}>
          <Text style={styles.buttonText}>ADD TO CART</Text>
        </Pressable>
      )}
    </View>
  </Pressable>
);

// const styles = StyleSheet.create({
//   // Styles from the original code...
// });

export default LaundryItem;
