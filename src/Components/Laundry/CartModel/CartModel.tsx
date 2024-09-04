import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import {CartItem} from '../../../services/cartSlice';
import {placeOrder} from '../../../services/orderService';
import styles from '../styles';
import LaundryItem from '../LaundryItems';
import AddressList from '../Address/AddressList';
import SelectedAddress from './SelectedAddress';
import OrderSummary from './OrderSummary';
import {Address, LaundryProduct} from '../../../utils/canonicalModel';

interface CartModalProps {
  cart: CartItem[];
  LaundryProducts: LaundryProduct[];
  modalVisible: boolean;
  animationValue: Animated.Value;
  closeCartModal: () => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  handleCheckboxChange: (
    cartItem: CartItem,
    service: 'ironing' | 'washing',
  ) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  cart,
  LaundryProducts,
  modalVisible,
  animationValue,
  closeCartModal,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
  handleCheckboxChange,
}) => {
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleShowAddress = () => setShowAddress(true);
  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setShowAddress(false);
  };
  const handleBackToCart = () => setShowAddress(false);

  const handlePlaceOrder = async () => {
    if (!selectedAddress || cart.length === 0) {
      Alert.alert(
        'Error',
        'Please add items to the cart and select an address.',
      );
      return;
    }

    setLoading(true);

    try {
      await placeOrder({
        cartItems: cart,
        address: selectedAddress,
        totals: {
          washingTotal,
          ironingTotal,
          finalTotal: totalPrice,
        },
      });
      Alert.alert('Success', 'Your order has been placed successfully.');
      closeCartModal();
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert(
        'Error',
        'Failed to place the order. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="none"
      onRequestClose={closeCartModal}>
      <TouchableWithoutFeedback onPress={closeCartModal}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContent,
          {transform: [{translateY: animationValue}]},
        ]}>
        {showAddress ? (
          <AddressList
            onBack={handleBackToCart}
            onAddressSelect={handleAddressSelect}
          />
        ) : (
          <>
            <View style={styles.modalHeader}>
              <Pressable style={styles.closeButton} onPress={closeCartModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
              <Text style={styles.title}>Laundry Cart</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {cart.length === 0 ? (
                <View>
                  <Text>Please add items to the laundry cart</Text>
                </View>
              ) : (
                cart.map(cartItem => {
                  const product = LaundryProducts.find(
                    p => p.id === cartItem.id,
                  );
                  return product ? (
                    <LaundryItem
                      key={cartItem.id}
                      item={product}
                      cartItem={cartItem}
                      addItemToCart={() => {}}
                      removeItemFromCart={removeItemFromCart}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  ) : null;
                })
              )}
              {cart.length >= 1 && (
                <OrderSummary
                  totalItems={totalItems}
                  washingTotal={washingTotal}
                  ironingTotal={ironingTotal}
                  totalPrice={totalPrice}
                />
              )}
              {selectedAddress ? (
                <SelectedAddress
                  selectedAddress={selectedAddress}
                  onChangeAddress={handleShowAddress}
                />
              ) : (
                <Pressable
                  style={styles.checkoutButton}
                  onPress={handleShowAddress}>
                  <Text style={styles.checkoutButtonText}>
                    Select Address!!
                  </Text>
                </Pressable>
              )}
              {cart.length > 0 && selectedAddress && (
                <Pressable
                  style={[styles.checkoutButton, styles.placeOrderButton]}
                  onPress={handlePlaceOrder}
                  disabled={loading}>
                  <Text style={styles.checkoutButtonText}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Text>
                </Pressable>
              )}
            </ScrollView>
          </>
        )}
      </Animated.View>
    </Modal>
  );
};

export default CartModal;
