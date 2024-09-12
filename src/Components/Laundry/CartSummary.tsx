import React from 'react';
import {Text, Pressable} from 'react-native';
// import styles from './styles';
import styles from './styles';
import {CartItem} from '../../services/cartSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import {clearCart} from '../../services/cartSlice';
import {useDispatch} from 'react-redux';

interface Props {
  cart: CartItem[];
  onPress: () => void;
}

const CartSummary: React.FC<Props> = ({cart, onPress}) => {
  const dispatch = useDispatch();
  const washingTotal = cart.reduce(
    (sum, item) =>
      item.isWashingSelected ? sum + item.quantity * item.price : sum,
    0,
  );
  const ironingTotal = cart.reduce(
    (sum, item) =>
      item.isIroningSelected ? sum + item.quantity * item.ironRate : sum,
    0,
  );
  const totalPrice = washingTotal + ironingTotal;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const clearCartt = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Pressable style={styles.cartSummary} onPress={onPress}>
        <Text
          style={styles.cartSummaryText}>{`${totalItems} items Added`}</Text>
        <Text style={styles.cartSummaryText}>{`Total: ${totalPrice} Rs`}</Text>
      </Pressable>
      {cart.length >= 1 ? (
        <Pressable style={styles.deleteIcon} onPress={clearCartt}>
          <MaterialCommunityIcons
            name="delete"
            size={30}
            color={theme.colors.primary}
          />
        </Pressable>
      ) : (
        ''
      )}
    </>
  );
};

export default CartSummary;
