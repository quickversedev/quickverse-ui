import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartButton from './CartButton';
import theme from '../../theme';
import {useFetchProductsAndCategories} from '../../services/Hooks/fetchProductAndCategory';
import {ProductCartItems, Vendor} from '../../utils/canonicalModel';
import {Product} from '../../data/mockProductData';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  selectCart,
} from '../../services/cart/productCartSlice';
import {Category} from '../../data/mockCategoriesData';
import CartScreen from '../Cart/CartScreen';
import VendorDetails from './venderHeader';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../Vendors/VendorsNavigator';
import {Loading} from '../util/Loading';
import CustomConfirmationModal from '../Cart/CustomConfirmationModal';
import {isStoreOpen} from '../util/vendorUtil';
import {useAuth} from '../../utils/AuthContext';
import {setSkipLoginFlow} from '../../utils/Storage';
import {AppDispatch} from '../../store/store';
import {debounce} from 'lodash';

type CategoriesScreenProps = {
  route: RouteProp<RootStackParamList, 'Categories'>;
};

const Categories: React.FC<CategoriesScreenProps> = ({route}) => {
  const {authData, setSkipLogin} = useAuth();
  const vendor: Vendor = route.params.vendor;
  const {products, categories, loading, error} =
    useFetchProductsAndCategories();
  const dispatch = useDispatch<AppDispatch>();

  const [cartItems, setCartItems] = useState<{[key: string]: ProductCartItems}>(
    {},
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [productToAdd, setProductToAdd] = useState<ProductCartItems | null>(
    null,
  );
  const cart = useSelector(selectCart);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storeOpen, setStoreOpen] = useState(
    isStoreOpen(vendor.storeOpeningTime, vendor.storeClosingTime),
  );
  const categoriesWithProducts = categories.filter(category =>
    products.some(product => product.category === category.name),
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoriesWithProducts[0]?.name,
  );
  useEffect(() => {
    setCartItems(
      cart.reduce<{[key: string]: ProductCartItems}>((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {}),
    );
  }, [cart]);

  useEffect(() => {
    setSelectedCategory(categories[0]?.name);
  }, [categories]);

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Error loading data</Text>
      </View>
    );
  }

  const handleCategoryPress = (categoryName: string) => {
    if (storeOpen) {
      setSelectedCategory(categoryName);
    }
  };
  const handleClick = () => {
    if (!authData) {
      setSkipLogin(false);
      setSkipLoginFlow(false);
    }
  };
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
    if (storeOpen) {
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
    }
  }, 300);

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

  const handleIncreaseQuantity = debounce((productId: string) => {
    if (storeOpen) {
      if (authData) {
        dispatch(incrementQuantity(productId, authData));
      }
    }
  }, 300);

  const handleDecreaseQuantity = debounce((productId: string) => {
    if (storeOpen) {
      if (authData) {
        dispatch(decrementQuantity(productId, authData));
      }
    }
  }, 300);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const renderCategoryItem = ({item}: {item: Category}) => {
    const isSelected = item.name === selectedCategory;

    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          isSelected && styles.selectedCategoryContainer,
          !storeOpen && styles.disabledCategoryContainer, // Disabled style
        ]}
        onPress={() => handleCategoryPress(item.name)}
        // disabled={!storeOpen} // Disable touch if store is closed
      >
        <Image
          source={{uri: item.imageURLs[0]}}
          style={styles.categoryImage}
          resizeMode="cover"
        />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({item}: {item: Product}) => {
    const isOutOfStock = item.availability === 'Out of Stock';

    const product: ProductCartItems = {
      id: item.productId,
      name: item.title,
      productPrice: item.productPrice,
      salePrice: item.productSalePrice,
      quantity: cartItems[item.productId]?.quantity || 0,
      image: item.productImageLink,
      shopId: item.shopId,
    };

    return (
      <View
        style={[
          styles.productContainer,
          (!storeOpen || isOutOfStock) && styles.disabledProductContainer,
        ]}>
        <View>
          <Image
            source={{uri: product.image}}
            style={styles.productImage}
            resizeMode="cover"
          />
          {isOutOfStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          <Text style={styles.productRating}>R: N/A</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>₹{product.productPrice}</Text>
            <Text style={styles.salePrice}> ₹{product.salePrice}</Text>
          </View>
          <CartButton
            quantity={product.quantity}
            onIncrease={() => handleIncreaseQuantity(product.id)}
            onDecrease={() => handleDecreaseQuantity(product.id)}
            onAdd={() => handleAddToCart(product)}
            added={product.quantity > 0}
            disabled={!storeOpen || isOutOfStock} // Disable button if store is closed or out of stock
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.shopHeader}>
          <Text style={styles.shopName}>{vendor?.vendorName}</Text>
          {!storeOpen && (
            <Text style={styles.storeClosedText}>Store is Closed</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setModalVisible(true)}
          // disabled={!storeOpen} // Disable cart button if store is closed
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color="#FFDC52"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.productsContainer}>
        <VendorDetails vendor={vendor} />
        {loading ? (
          <Loading />
        ) : (
          <>
            <FlatList
              data={categoriesWithProducts}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            <ScrollView style={styles.productsContainer}>
              <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.productId}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={styles.productList}
              />
            </ScrollView>
          </>
        )}
        <CartScreen
          modalVisible={modalVisible}
          closeCartModal={() => setModalVisible(false)}
        />
        <CustomConfirmationModal
          isVisible={isConfirmationModalVisible}
          onConfirm={handleConfirmAddToCart}
          onCancel={handleCancelAddToCart}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  shopHeader: {
    backgroundColor: theme.colors.ternary,
    padding: 8,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.ternary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textTransform: 'uppercase',
  },
  storeClosedText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
  cartButton: {
    height: 50,
    width: 50,
    borderRadius: 15,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    height: 120,
    paddingVertical: 10,
  },
  categoryContainer: {
    width: 100,
    padding: 8,
    margin: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3C200',
    backgroundColor: theme.colors.primary,
  },
  selectedCategoryContainer: {
    borderColor: theme.colors.ternary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.6,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  disabledCategoryContainer: {
    opacity: 0.5, // Reduce opacity for disabled state
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryName: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  productsContainer: {
    flex: 1,
  },
  productContainer: {
    flex: 1,
    margin: 7,
    borderRadius: 15,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.7,
        shadowRadius: 7,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  disabledProductContainer: {
    opacity: 0.5, // Reduce opacity for disabled state
  },
  productImage: {
    width: 70,
    height: 75,
    borderRadius: 25,
  },
  productDetails: {
    flex: 1,
    marginVertical: 15,
    paddingLeft: 7,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    color: '#103E60',
    fontWeight: '900',
  },
  productPrice: {
    fontSize: 18,
    color: '#8F1413',
    marginVertical: 5,
    fontWeight: '900',
  },
  productRating: {
    fontSize: 14,
    marginLeft: 5,
    color: '#8F1413',
    fontWeight: '900',
  },
  productList: {
    justifyContent: 'flex-start',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  loaderText: {
    fontSize: 18,
    color: theme.colors.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1, // Prevents text overflow
    flexWrap: 'wrap', // Ensures text wraps inside container
    maxWidth: '100%', // Keeps content within bounds
    marginVertical: 5,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 12,
    marginRight: 8, // Adds space between prices
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Categories;
