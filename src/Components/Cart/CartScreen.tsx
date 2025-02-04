import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from 'react-native';
import CartListScreen from '../Cart/CartListScreen';
import PaymentSummaryScreen from '../Cart/PaymentSummaryScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  decrementProductQuantity,
  incrementProductQuantity,
} from '../../services/productCartSlice';

interface CartModalProps {
  modalVisible: boolean;
  closeCartModal: () => void;
}
const CartScreen: React.FC<CartModalProps> = ({
  modalVisible,
  closeCartModal,
}) => {
  const cartItems = useSelector(
    (state: RootState) => state.productCart.productCart,
  );
  const animationValue = new Animated.Value(0); // Define animationValue
  const dispatch = useDispatch<AppDispatch>();
  const handleIncrement = (itemId: string) => {
    dispatch(incrementProductQuantity({id: itemId}));
  };

  const handleDecrement = (itemId: string) => {
    dispatch(decrementProductQuantity({id: itemId}));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };
  console.log('cartItems', cartItems);
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closeCartModal}>
      <TouchableWithoutFeedback onPress={closeCartModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [
              {
                translateY: animationValue,
              },
            ],
          },
        ]}>
        <View style={styles.cartHeader}>
          <Text style={styles.header}>Your Cart</Text>
          <TouchableOpacity onPress={closeCartModal}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeader}>
          {cartItems.length} Items in your cart
        </Text>

        <CartListScreen
          cartItems={cartItems}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        <PaymentSummaryScreen getTotalPrice={getTotalPrice} />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Add the shared styles here

  header: {
    fontSize: 34,
    fontWeight: 'bold',
    color: theme.colors.secondary,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '90%',
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CartScreen;
