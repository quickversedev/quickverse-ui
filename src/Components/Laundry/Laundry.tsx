import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  CartItem,
  updateCartItemServices,
} from '../../services/cartSlice';
import {LaundryProduct} from '../../utils/canonicalModel';
import {fetchLaundryProductsList} from '../../services/laundryProductsSlice';
import {Loading} from '../util/Loading';
import LaundryItem from './LaundryItems';
import CartModal from './CartModel/CartModel';
import styles from './styles';
import CartSummary from './CartSummary';
import AppHeader from '../util/AppHeader';

const Laundry: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {LaundryProducts, loading} = useSelector(
    (state: RootState) => state.laundryProducts,
  );
  const cart = useSelector((state: RootState) => state.cart.cart);

  const [modalVisible, setModalVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    dispatch(fetchLaundryProductsList());
  }, [dispatch]);

  const addItemToCart = (item: LaundryProduct) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      ironRate: item.ironRate,
      quantity: 1,
      isIroningSelected: false,
      isWashingSelected: true,
    };
    dispatch(addToCart(cartItem));
  };

  const removeItemFromCart = (item: CartItem) => {
    dispatch(removeFromCart({id: item.id}));
  };

  const increaseQuantity = (item: CartItem) => {
    dispatch(incrementQuantity({id: item.id}));
  };

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart({id: item.id}));
    } else {
      dispatch(decrementQuantity({id: item.id}));
    }
  };

  const handleCheckboxChange = (
    cartItem: CartItem,
    service: 'ironing' | 'washing',
  ) => {
    const updatedItem = {
      ...cartItem,
      isIroningSelected:
        service === 'ironing'
          ? !cartItem.isIroningSelected
          : cartItem.isIroningSelected,
      isWashingSelected:
        service === 'washing'
          ? !cartItem.isWashingSelected
          : cartItem.isWashingSelected,
    };
    dispatch(updateCartItemServices(updatedItem));
  };

  const openCartModal = () => {
    setModalVisible(true);
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeCartModal = () => {
    Animated.timing(animationValue, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.header}>
        <AppHeader headerText="Laundry" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {LaundryProducts.map(product => (
          <LaundryItem
            key={product.id}
            item={product}
            cartItem={cart.find(cartItem => cartItem.id === product.id)}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
        <Pressable onPress={openCartModal} style={styles.cartButton}>
          <Text style={styles.cartButtonText}>View Cart</Text>
        </Pressable>
      </ScrollView>
      <CartModal
        cart={cart}
        LaundryProducts={LaundryProducts}
        modalVisible={modalVisible}
        animationValue={animationValue}
        closeCartModal={closeCartModal}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeItemFromCart={removeItemFromCart}
        handleCheckboxChange={handleCheckboxChange}
      />
      {cart.length > 0 && <CartSummary cart={cart} onPress={openCartModal} />}
    </SafeAreaView>
  );
};

export default Laundry;
