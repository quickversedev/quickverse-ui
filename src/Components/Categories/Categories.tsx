import React, {useEffect, useState, useRef} from 'react';
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
  Animated,
  Alert,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartButton from './CartButton';
import theme from '../../theme';
import {useFetchProductsAndCategories} from '../../services/Hooks/fetchProductAndCategory';
import {
  Category,
  Product,
  ProductCartItems,
  Vendor,
} from '../../utils/canonicalModel';

import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  selectCart,
} from '../../services/cart/productCartSlice';

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
  const {products, categories, loading, error} = useFetchProductsAndCategories(
    vendor.vendorId,
  );
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

  const [showBanner, setShowBanner] = useState(true);
  const bannerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    lastScrollY.current = offsetY;

    if (offsetY > 10 && showBanner) {
      Animated.timing(bannerTranslateY, {
        toValue: -500, // Moves it out of view (adjust as needed)
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowBanner(false)); // Hide after animation
    } else if (offsetY <= 10 && !showBanner) {
      setShowBanner(true);
      Animated.timing(bannerTranslateY, {
        toValue: 0, // Bring it back
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const [storeOpen] = useState(
    isStoreOpen(vendor.storeOpeningTime, vendor.storeClosingTime),
  );
  // Create an "Other" category for products without a category
  const otherCategory: Category = {
    id: 'other',
    name: 'Other',
    imageURLs: ['https://via.placeholder.com/150'],
    description: 'other',
    type: '',
    parentCategory: null,
    countOfSkus: 0,
  };
  const categoriesWithProducts = (categories || []).filter(category =>
    (products || []).some(product => product.category === category.id),
  );
  const productsWithoutCategory = (products || []).filter(
    product => !categoriesWithProducts.some(cat => cat.id === product.category),
  );

  if (productsWithoutCategory.length > 0) {
    categoriesWithProducts.push(otherCategory);
  }

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoriesWithProducts[0]?.id,
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCartItems(
      cart.reduce<{[key: string]: ProductCartItems}>((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {}),
    );
  }, [cart]);

  useEffect(() => {
    setSelectedCategory(categories[0]?.id);
  }, [categories]);

  const filteredCategories = categoriesWithProducts.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredProducts = searchQuery
    ? (products || []).filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : selectedCategory
    ? (products || []).filter(product =>
        selectedCategory === 'other'
          ? !categoriesWithProducts.some(cat => cat.id === product.category)
          : product.category === selectedCategory,
      )
    : products || [];

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Error loading data</Text>
      </View>
    );
  }

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
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
      if (cart.length > 0 && cart[0].vendorId !== product.vendorId) {
        setProductToAdd(product);
        setConfirmationModalVisible(true);
      } else {
        console.log('[189 categories:]', product);
        dispatch(
          addToCart(
            {
              id: product.id,
              name: product.name,
              productPrice: product.productPrice,
              salePrice: product.salePrice,
              quantity: 1,
              image: product.image,
              vendorId: product.vendorId,
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
              vendorId: productToAdd.vendorId,
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

  const renderCategoryItem = ({item}: {item: Category}) => {
    const isSelected = item.id === selectedCategory;
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          isSelected && styles.selectedCategoryContainer,
          !storeOpen && styles.disabledCategoryContainer,
        ]}
        onPress={() => handleCategoryPress(item.id)}>
        <Image
          source={{uri: item?.imageURLs?.[0]}}
          style={styles.categoryImage}
          resizeMode="cover"
        />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({item}: {item: Product}) => {
    const isInStock = item.availability;

    const product: ProductCartItems = {
      id: item.productId,
      name: item.title,
      productPrice: item.productPrice,
      salePrice: item.productSalePrice,
      quantity: cartItems[item.productId]?.quantity || 0,
      image: item.productImageLink,
      vendorId: item.vendorId,
    };
    const isProductOnSale =
      item.productSalePrice && item.productSalePrice !== item.productPrice;
    return (
      <View
        style={[
          styles.productContainer,
          (!storeOpen || !isInStock) && styles.disabledProductContainer,
        ]}>
        {/* image */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: product.image}}
            style={styles.productImage}
            resizeMode="cover"
          />
          {!isInStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          {/* <Text style={styles.productRating}>R: N/A</Text> */}
        </View>

        {/* datails */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          {isProductOnSale && (
            <Text style={styles.originalPrice}>₹{product.productPrice}</Text>
          )}
          <Text style={styles.salePrice}> ₹{product.salePrice}</Text>

          <View style={{position: 'absolute', bottom: 0, right: 0}}>
            <CartButton
              quantity={product.quantity}
              onIncrease={() => handleIncreaseQuantity(product.id)}
              onDecrease={() => handleDecreaseQuantity(product.id)}
              onAdd={() => handleAddToCart(product)}
              added={product.quantity > 0}
              disabled={!storeOpen || !isInStock}
            />
          </View>
        </View>
      </View>
    );
  };

  // Calculate total number of items in the cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <SafeAreaView style={styles.main}>
      {/* store-Status */}
      {!storeOpen && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 10,
            zIndex: 100,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              backgroundColor: 'rgba(223, 49, 49, 0.5)',
              padding: 10,
              borderRadius: 15,
            }}>
            Store is Closed
          </Text>
        </View>
      )}

      {/* Header Section */}
      <View style={styles.searchAndCartContainer}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={theme.colors.ternary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Category or Product"
            placeholderTextColor={theme.colors.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color="#FFDC52"
          />
          {/* Cart Item Count Badge */}
          {totalCartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        {/* vendor-banner */}
        {showBanner && (
          <Animated.View style={{transform: [{translateY: bannerTranslateY}]}}>
            <VendorDetails vendor={vendor} />
          </Animated.View>
        )}

        {/* Categories and Products */}
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          {/* Categories */}
          <View
            style={{
              height: '100%',
              width: '30%',
            }}>
            <FlatList
              data={filteredCategories}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar
              showsVerticalScrollIndicator={false} // Hides vertical scrollbar
              contentContainerStyle={{}}
              onScroll={handleScroll}
              scrollEventThrottle={100}
            />
          </View>

          {/* seperator-line */}
          <View style={{borderWidth: 0.5, borderColor: 'black'}}></View>

          {/* products */}
          <View
            style={{
              height: '100%',
              width: '70%',
            }}>
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.productId}
              showsHorizontalScrollIndicator={false} // Hides horizontal scrollbar
              showsVerticalScrollIndicator={false} // Hides vertical scrollbar
              contentContainerStyle={{padding: 10, height: '100%'}}
              onScroll={handleScroll}
              scrollEventThrottle={100}
            />
          </View>
        </View>
      </View>

      <CartScreen
        modalVisible={modalVisible}
        closeCartModal={() => setModalVisible(false)}
      />
      <CustomConfirmationModal
        isVisible={isConfirmationModalVisible}
        onConfirm={handleConfirmAddToCart}
        onCancel={handleCancelAddToCart}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },

  searchAndCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  searchContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    borderRadius: 15,

    // shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.secondary,
  },

  cartButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
    opacity: 0.5,
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
    borderWidth: 2,
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
    marginBottom: 10,
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
    opacity: 0.5,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  productDetails: {
    flex: 1,
    // marginVertical: 15,
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
    flexShrink: 1,
    flexWrap: 'wrap',
    maxWidth: '100%',
    marginVertical: 5,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 12,
    marginRight: 8,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.secondary,
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
