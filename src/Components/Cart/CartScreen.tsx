import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import CartListScreen from '../Cart/CartListScreen';
import PaymentSummaryScreen from '../Cart/PaymentSummaryScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  clearFromCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectShopId,
} from '../../services/cart/productCartSlice';
import {Vendor} from '../../utils/canonicalModel';
import {selectVendorDetailsByShopId} from '../../services/VendorListSlice';
import {isStoreOpen} from '../util/vendorUtil';
import LoginCard from '../util/MandatoryLoginButton';
import {useAuth} from '../../utils/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    authData && dispatch(incrementQuantity(itemId, authData));
  };

  const handleDecrement = (itemId: string) => {
    authData && dispatch(decrementQuantity(itemId, authData));
  };

  const handleDelete = (itemId: string) => {
    authData && dispatch(removeFromCart(itemId, authData));
  };

  const handleClearCart = () => {
    authData && dispatch(clearFromCart(authData));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.productPrice) * item.quantity,
      0,
    );
  };

  const getTotalDiscount = () => {
    return cartItems.reduce((total, product) => {
      return (
        total +
        (Number(product.productPrice) - Number(product.salePrice)) *
          product.quantity
      );
    }, 0);
  };

  const getFinalPrice = () => {
    return getTotalPrice() - getTotalDiscount();
  };

  const isStoreOpened =
    vendor && isStoreOpen(vendor.storeOpeningTime, vendor.storeClosingTime);
  const isCartEmpty = cartItems.length === 0;
  const pricesObject = {
    productPriceTotal: getTotalPrice(),
    totalDiscount: getTotalDiscount(),
    finalTotal: getFinalPrice(),
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
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
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Your Cart</Text>
            <TouchableOpacity
              onPress={closeCartModal}
              style={styles.closeButton}
              activeOpacity={0.6}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={theme.colors.ternary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.subHeader}>
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in your
            cart from
          </Text>

          <View style={styles.vendorRow}>
            <Text
              style={styles.vendorName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {vendor?.vendorName || 'Vendor'}
            </Text>
            {!isCartEmpty && (
              <TouchableOpacity
                style={styles.clearCartButton}
                onPress={handleClearCart}
                activeOpacity={0.6}>
                <Text style={styles.clearCartButtonText}>Clear Cart</Text>
              </TouchableOpacity>
            )}
          </View>

          {!isCartEmpty && !isStoreOpened && (
            <View style={styles.storeClosedCard}>
              <Text style={styles.storeClosedText}>
                Store is Closed, Can't Place the Order
              </Text>
              <TouchableOpacity
                style={[styles.clearCartButton, styles.storeClosedButton]}
                onPress={handleClearCart}
                activeOpacity={0.6}>
                <Text style={styles.clearCartButtonText}>Clear Cart</Text>
              </TouchableOpacity>
            </View>
          )}

          {authData ? (
            <View style={styles.scrollContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <CartListScreen
                  cartItems={cartItems}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleDelete={handleDelete}
                />
                {!isCartEmpty ? (
                  <PaymentSummaryScreen
                    getTotalPrice={pricesObject}
                    vendor={vendor}
                    isStoreOpened={isStoreOpened}
                    isCartEmpty={isCartEmpty}
                    closeCartModal={closeCartModal}
                  />
                ) : (
                  <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>
                      Your cart is empty. Add items to continue.
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            <LoginCard feature="Cart" />
          )}
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
        borderTopWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)',
      },
    }),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
  },
  subHeader: {
    fontSize: 15,
    color: theme.colors.ternary,
    marginBottom: 12,
  },
  vendorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.ternary,
    flex: 1,
    marginRight: 12,
  },
  clearCartButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  clearCartButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  storeClosedCard: {
    backgroundColor: theme.colors.errorBackground,
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.error,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  storeClosedText: {
    fontSize: 15,
    color: theme.colors.error,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  storeClosedButton: {
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyCartText: {
    fontSize: 16,
    color: theme.colors.ternary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CartScreen;
