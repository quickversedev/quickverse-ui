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
  clearCart,
  decrementProductQuantity,
  incrementProductQuantity,
  removeFromProductCart,
  selectShopId,
} from '../../services/cart/productCartSlice';
import {ScrollView} from 'react-native-gesture-handler';
import {Vendor} from '../../utils/canonicalModel';
import {selectVendorDetailsByShopId} from '../../services/VendorListSlice';
import {isStoreOpen} from '../util/vendorUtil';
import LoginCard from '../util/MandatoryLoginButton';
import {useAuth} from '../../utils/AuthContext';

interface CartModalProps {
  modalVisible: boolean;
  closeCartModal: () => void;
}
const CartScreen: React.FC<CartModalProps> = ({
  modalVisible,
  closeCartModal,
}) => {
  const {authData} = useAuth();
  const cartItems = useSelector(
    (state: RootState) => state.productCart.productCart,
  );
  const shopId = useSelector(selectShopId);

  const vendor: Vendor | undefined = useSelector((state: RootState) =>
    selectVendorDetailsByShopId(state, shopId),
  );
  const animationValue = new Animated.Value(0);
  const dispatch = useDispatch<AppDispatch>();
  const handleIncrement = (itemId: string) => {
    dispatch(incrementProductQuantity({id: itemId}));
  };

  const handleDecrement = (itemId: string) => {
    dispatch(decrementProductQuantity({id: itemId}));
  };
  const handleDelete = (itemId: string) => {
    dispatch(removeFromProductCart({id: itemId}));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };
  const isStoreOpened =
    vendor && isStoreOpen(vendor.storeOpeningTime, vendor.storeClosingTime);
  console.log('isStoreOpened', vendor);
  const isCartEmpty = cartItems.length === 0;

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
          {cartItems.length} Items in your cart from
        </Text>
        <Text style={styles.vendorName}>{vendor?.vendorName}</Text>
        {!isCartEmpty && !isStoreOpened && (
          <View style={styles.storeClosedCard}>
            <Text style={styles.storeClosedText}>
              Store is Closed, Can't Place the Order
            </Text>
            <TouchableOpacity
              style={styles.clearCartButton}
              onPress={handleClearCart}>
              <Text style={styles.clearCartButtonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        {authData ? (
          <ScrollView>
            <CartListScreen
              cartItems={cartItems}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleDelete={handleDelete}
            />
            <PaymentSummaryScreen
              getTotalPrice={getTotalPrice}
              vendor={vendor}
              isStoreOpened={isStoreOpened}
              isCartEmpty={isCartEmpty}
            />
          </ScrollView>
        ) : (
          <LoginCard feature="Cart" />
        )}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: 5,
  },
  clearCartButton: {
    backgroundColor: theme.colors.error,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  clearCartButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  subHeader: {
    fontSize: 18,
    color: theme.colors.ternary,
  },
  vendorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ternary,
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
  storeClosedCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  storeClosedText: {
    fontSize: 16,
    color: theme.colors.error,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartScreen;
