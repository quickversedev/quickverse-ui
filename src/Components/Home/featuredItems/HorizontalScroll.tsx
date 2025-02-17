import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  selectCart,
} from '../../../services/cart/productCartSlice';
import {Product} from '../../../data/mockProductData';
import theme from '../../../theme';
import CustomConfirmationModal from '../../Cart/CustomConfirmationModal';
import {ProductCartItems} from '../../../utils/canonicalModel';
import {AppDispatch} from '../../../store/store';
import {useAuth} from '../../../utils/AuthContext';
import {debounce} from 'lodash';
import {setSkipLoginFlow} from '../../../utils/Storage';

const {width} = Dimensions.get('window');

interface Props {
  featuredItems: Product[];
}

const HorizontalScroll: React.FC<Props> = ({featuredItems}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {authData, setSkipLogin} = useAuth();
  const cartItems = useSelector(selectCart);
  const inStock = featuredItems.filter(item => item.availability);
  const handleClick = () => {
    if (!authData) {
      setSkipLogin(false);
      setSkipLoginFlow(false);
    }
  };

  const cart = useSelector(selectCart);
  const handleAddToCart = debounce((product: ProductCartItems) => {
    if (!authData) {
      Alert.alert(
        'Login Required',
        'Please log in to add products to your cart.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Login', onPress: () => handleClick()},
        ],
      );
      return;
    }

    if (cart.length > 0 && cart[0].shopId !== product.shopId) {
      setProductToAdd(product);
      setConfirmationModalVisible(true);
    } else {
      dispatch(
        addToCart(
          {
            id: product.id,
            name: product.name,
            productPrice: product.productPrice,
            salePrice: product.salePrice,
            quantity: 1,
            image: product.image,
            shopId: product.shopId,
          },
          authData,
        ),
      );
    }
  }, 300);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [productToAdd, setProductToAdd] = useState<ProductCartItems | null>(
    null,
  );
  const handleConfirmAddToCart = () => {
    if (productToAdd) {
      dispatch(clearCart());
      if (authData) {
        dispatch(
          addToCart(
            {
              id: productToAdd.id,
              name: productToAdd.name,
              productPrice: productToAdd.productPrice,
              salePrice: productToAdd.salePrice,
              quantity: 1,
              image: productToAdd.image,
              shopId: productToAdd.shopId,
            },
            authData,
          ),
        );
      }
      setConfirmationModalVisible(false);
      setProductToAdd(null);
    }
  };
  const handleCancelAddToCart = () => {
    setConfirmationModalVisible(false);
    setProductToAdd(null);
  };
  const handleIncrement = (itemId: string) => {
    if (authData) {
      dispatch(incrementQuantity(itemId, authData));
    }
  };

  const handleDecrement = (itemId: string) => {
    if (authData) {
      dispatch(decrementQuantity(itemId, authData));
    }
  };

  const renderItem = ({item}: {item: Product}) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.productId);
    const quantity = cartItem ? cartItem.quantity : 0;

    const discountPercentage = Math.round(
      ((Number(item.productPrice) - Number(item.productSalePrice)) /
        Number(item.productPrice)) *
        100,
    );
    const product: ProductCartItems = {
      id: item.productId,
      name: item.title,
      productPrice: item.productPrice,
      salePrice: item.productSalePrice,
      quantity: 1,
      image: item.productImageLink,
      shopId: item.shopId,
    };
    return (
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{uri: `${item.productImageLink}`}}
              style={styles.image}
            />
            {discountPercentage > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {discountPercentage}% OFF
                </Text>
              </View>
            )}
          </View>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.itemName} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>₹{item.productPrice}</Text>
              <Text style={styles.salePrice}> ₹{item.productSalePrice}</Text>
            </View>
            <View style={styles.buttonContainer}>
              {quantity === 0 ? (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(product)}>
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleDecrement(item.productId)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleIncrement(item.productId)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={inStock}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
      <CustomConfirmationModal
        isVisible={isConfirmationModalVisible}
        onConfirm={handleConfirmAddToCart}
        onCancel={handleCancelAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    height: 200, // Fixed height for the container to ensure consistent card size
  },
  cardContainer: {
    width: width * 0.3,
    marginHorizontal: 10,
    alignItems: 'center',
    height: '100%',
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    height: 180,
  },
  image: {
    height: 100,
    width: '100%',
  },
  cardContent: {
    alignItems: 'center',
    padding: 6,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginTop: 5,
    textAlign: 'center',
    // numberOfLines: 2, // Limit the title to 2 lines
    // ellipsizeMode: 'tail',
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#8B0000',
    borderRadius: 15,
    // width: '80%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  quantityButton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#8B0000',
    borderRadius: 15,
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  quantityText: {
    marginHorizontal: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '100%',
    // marginVertical: 2,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 10,
    marginRight: 8,
  },
  salePrice: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
  imageContainer: {
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HorizontalScroll;
