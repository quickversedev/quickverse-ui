import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  Alert,
  TextInput,
  ActivityIndicator,
  Keyboard,
  RefreshControl,
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
  clearFromCart,
  decrementQuantity,
  incrementQuantity,
  selectCart,
} from '../../services/cart/productCartSlice';
import CartScreen from '../Cart/CartScreen';
import VendorDetails from './venderHeader';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../Vendors/VendorsNavigator';
import CustomConfirmationModal from '../Cart/CustomConfirmationModal';
import {isStoreOpen} from '../util/vendorUtil';
import {useAuth} from '../../utils/AuthContext';
import {setSkipLoginFlow} from '../../utils/Storage';
import {AppDispatch} from '../../store/store';
import {debounce} from 'lodash';
import VariantDrawer from './SubVeriant';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import 'react-native-gesture-handler';

type CategoriesScreenProps = {
  route: RouteProp<RootStackParamList, 'Categories'>;
};
const bannerHeight = 150;

const Categories: React.FC<CategoriesScreenProps> = ({route}) => {
  const {authData, setSkipLogin} = useAuth();
  const vendor: Vendor = route.params.vendor;
  const {
    products,
    categories,
    loading,
    productsLoading,
    categoriesLoading,
    productsComplete,
    error,
    refetch,
  } = useFetchProductsAndCategories(vendor.vendorId);

  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  };

  const [cartItems, setCartItems] = useState<{[key: string]: ProductCartItems}>(
    {},
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [productToAdd, setProductToAdd] = useState<ProductCartItems | null>(
    null,
  );
  const [showVariantDrawer, setShowVariantDrawer] = useState(false);
  const [selectedProductForVariants, setSelectedProductForVariants] =
    useState<Product | null>(null);
  const cart = useSelector(selectCart);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const bannerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, bannerHeight * 2],
            [0, -bannerHeight * 2],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, bannerHeight * 2],
            [0, -bannerHeight * 2],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const [storeOpen] = useState(
    isStoreOpen(vendor.storeOpeningTime, vendor.storeClosingTime),
  );

  const categoriesWithProducts = useMemo(() => {
    const baseCategories = (categories || []).filter(category =>
      (products || []).some(product => product.category === category.id),
    );

    const productsWithoutCategory = (products || []).filter(
      product => !baseCategories.some(cat => cat.id === product.category),
    );

    if (productsWithoutCategory.length > 0) {
      return [
        ...baseCategories,
        {
          id: 'other',
          name: 'Other',
          imageURLs: ['https://via.placeholder.com/150'],
          description: 'other',
          type: '',
          parentCategory: null,
          countOfSkus: 0,
        },
      ];
    }

    return baseCategories;
  }, [categories, products]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCartItems(
      cart.reduce<{[key: string]: ProductCartItems}>((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {}),
    );
  }, [cart]);

  const filteredCategories = categoriesWithProducts.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (categoriesWithProducts.length > 0) {
      setSelectedCategory(categoriesWithProducts[0]?.id);
    }
  }, [categoriesWithProducts]);

  const filteredProducts = (
    searchQuery
      ? (products || []).filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : selectedCategory
      ? (products || []).filter(product =>
          selectedCategory === 'other'
            ? !categoriesWithProducts.some(cat => cat.id === product.category)
            : product.category === selectedCategory,
        )
      : products || []
  )
    .slice()
    .sort((a, b) =>
      a.availability === b.availability ? 0 : a.availability ? -1 : 1,
    );

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

  const handleAddToCart = debounce((product: Product) => {
    if (storeOpen) {
      if (product.productSize && Number(product.productSize) > 1) {
        setSelectedProductForVariants(product);
        setShowVariantDrawer(true);
        return;
      }

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

      // Check if product has variants

      // Existing logic for non-variant products
      if (cart.length > 0 && cart[0].vendorId !== product.vendorId) {
        setProductToAdd({
          id: product.productId,
          name: product.title,
          productPrice: product.productPrice,
          salePrice: product.productSalePrice,
          quantity: 1,
          image: product.productImageLink,
          vendorId: product.vendorId,
          varients: product.productSize,
        });
        setConfirmationModalVisible(true);
      } else {
        dispatch(
          addToCart(
            {
              id: product.productId,
              name: product.title,
              productPrice: product.productPrice,
              salePrice: product.productSalePrice,
              quantity: 1,
              image: product.productImageLink,
              vendorId: product.vendorId,
              varients: product.productSize,
            },
            authData,
          ),
        );
      }
    }
  }, 300);

  const handleConfirmAddToCart = () => {
    if (productToAdd && authData) {
      dispatch(clearFromCart(authData));
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
            varients: productToAdd.varients,
          },
          authData,
        ),
      );
      setConfirmationModalVisible(false);
      setProductToAdd(null);
    }
  };

  const handleCancelAddToCart = () => {
    setConfirmationModalVisible(false);
    setProductToAdd(null);
  };

  const handleIncreaseQuantity = debounce((productId: string) => {
    if (storeOpen && authData) {
      dispatch(incrementQuantity(productId, authData));
    }
  }, 300);

  const handleDecreaseQuantity = debounce((productId: string) => {
    if (storeOpen && authData) {
      dispatch(decrementQuantity(productId, authData));
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
        onPress={() => handleCategoryPress(item.id)}
        disabled={loading || error}>
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
    const hasVariants = item.productSize && Number(item.productSize) > 1;
    const product: ProductCartItems = {
      id: item.productId,
      name: item.title,
      productPrice: item.productPrice,
      salePrice: item.productSalePrice,
      quantity: cartItems[item.productId]?.quantity || 0,
      image: item.productImageLink,
      vendorId: item.vendorId,
      varients: item.productSize,
    };
    const isProductOnSale =
      item.productSalePrice && item.productSalePrice !== item.productPrice;

    return (
      <View
        style={[
          styles.productContainer,
          (!storeOpen || !isInStock) && styles.disabledProductContainer,
        ]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          {isProductOnSale && (
            <Text style={styles.originalPrice}>₹{product.productPrice}</Text>
          )}
          <Text style={styles.salePrice}> ₹{product.salePrice}</Text>
          {hasVariants && (
            <Text style={styles.variantIndicator}>
              {product.varients} Varients
            </Text>
          )}
        </View>
        <View style={{position: 'absolute', bottom: 8, right: 0}}>
          <CartButton
            quantity={product.quantity}
            onIncrease={() => {
              if (item.productSize && Number(item.productSize) > 1) {
                setSelectedProductForVariants(item);
                setShowVariantDrawer(true);
                return;
              }
              handleIncreaseQuantity(product.id);
            }}
            onDecrease={() => {
              if (item.productSize && Number(item.productSize) > 1) {
                setSelectedProductForVariants(item);
                setShowVariantDrawer(true);
                return;
              }
              handleDecreaseQuantity(product.id);
            }}
            onAdd={() => handleAddToCart(item)}
            added={product.quantity > 0}
            disabled={!storeOpen || !isInStock || loading || error}
          />
        </View>
      </View>
    );
  };

  // Calculate total items in cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading && !products.length && !categories.length) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.ternary} />
        <Text style={styles.loaderText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={48}
          color={theme.colors.error}
        />
        <Text style={styles.errorText}>Failed to load products</Text>
        <Text style={styles.errorSubText}>Please try again later</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <Animated.View style={[styles.bannerContainer, bannerAnimatedStyle]}>
        {!storeOpen && (
          <View style={styles.storeClosedBanner}>
            <Text style={styles.storeClosedText}>Store is Closed</Text>
          </View>
        )}

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
              editable={!loading && !error}
            />
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setModalVisible(true)}
            disabled={loading || error}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color="#FFDC52"
            />
            {totalCartItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <VendorDetails vendor={vendor} />
      </Animated.View>

      <Animated.View style={[styles.contentContainer, contentAnimatedStyle]}>
        <View style={styles.categoriesListContainer}>
          {categoriesLoading && categories.length === 0 ? (
            <View style={styles.sectionLoading}>
              <ActivityIndicator size="small" color={theme.colors.ternary} />
              <Text style={styles.sectionLoadingText}>
                Loading categories...
              </Text>
            </View>
          ) : (
            <Animated.FlatList
              data={filteredCategories}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              onScroll={scrollHandler}
              // scrollEventThrottle={16}
              keyboardDismissMode="on-drag"
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[theme.colors.ternary]}
                  tintColor={theme.colors.ternary}
                />
              }
            />
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.productsListContainer}>
          {productsLoading && products.length === 0 ? (
            <View style={styles.sectionLoading}>
              <ActivityIndicator size="small" color={theme.colors.ternary} />
              <Text style={styles.sectionLoadingText}>Loading products...</Text>
            </View>
          ) : (
            <Animated.FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.productId}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              contentContainerStyle={
                filteredProducts.length === 0 && styles.emptyProductList
              }
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              ListFooterComponent={
                !productsComplete && (
                  <View style={styles.loadingMoreContainer}>
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.ternary}
                    />
                    <Text style={styles.loadingMoreText}>
                      Loading more products...
                    </Text>
                  </View>
                )
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[theme.colors.ternary]}
                  tintColor={theme.colors.ternary}
                />
              }
            />
          )}
        </View>
      </Animated.View>

      {showVariantDrawer && selectedProductForVariants && (
        <VariantDrawer
          product={selectedProductForVariants}
          onClose={() => {
            setShowVariantDrawer(false);
            setSelectedProductForVariants(null);
          }}
          disabled={!storeOpen || loading || error}
          storeOpen={storeOpen}
          vendorId={vendor.vendorId}
          handleAddToCart={handleAddToCart}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          // onAddToCart={handleAddVariantToCart}
        />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
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
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    color: theme.colors.error,
    fontWeight: 'bold',
    marginTop: 16,
  },
  errorSubText: {
    fontSize: 16,
    color: theme.colors.secondary,
    marginTop: 8,
  },
  storeClosedBanner: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    zIndex: 100,
  },
  storeClosedText: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(223, 49, 49, 0.5)',
    padding: 10,
    borderRadius: 15,
  },
  searchAndCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16, // More balanced margin
    marginTop: Platform.select({
      ios: 8,
      android: 12,
    }),
    marginBottom: 8,
  },

  searchContainer: {
    flex: 1, // Take up available space
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 10, // Add space between search and cart button

    // Common shadow/elevation
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
      },
      android: {
        elevation: 3,
        borderWidth: 0.5,
        borderColor: theme.colors.secondary,
      },
    }),
  },
  variantIndicator: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 25,
    backgroundColor: 'rgba(100, 100, 255, 0.1)', // soft blue background
    color: theme.colors.ternary, // matching soft blue text
    fontSize: 12,
    fontWeight: '500',
  },
  searchIcon: {
    marginRight: 8,
    color: theme.colors.ternary,
    ...Platform.select({
      ios: {
        marginTop: 2, // Slight vertical adjustment for iOS
      },
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.secondary,
    paddingVertical: Platform.select({
      ios: 10,
      android: 8,
    }),
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontFamily: 'System',
      },
      android: {
        fontWeight: 'normal',
        includeFontPadding: false, // Remove extra padding on Android
      },
    }),
  },

  cartButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 15,
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
  bannerContainer: {
    zIndex: 10,
    backgroundColor: theme.colors.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    zIndex: 1, // Lower than banner

    // marginTop: 150, // Initial position below banner
  },
  categoriesListContainer: {
    height: '100%',
    width: '30%',
  },
  productsListContainer: {
    height: '100%',
    width: '70%',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'black',
  },
  emptyProductList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 16,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginTop: 20,
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
    borderRadius: 20,
  },
  categoryName: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  productContainer: {
    marginHorizontal: 12,
    height: 85,
    borderWidth: 2,
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    padding: 5,
    marginTop: 10,
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
    borderRadius: 15,
  },
  productDetails: {
    flex: 1,
    paddingLeft: 7,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    color: '#103E60',
    fontWeight: '900',
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
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionLoadingText: {
    marginTop: 8,
    color: theme.colors.secondary,
  },
  retryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: theme.colors.ternary,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingMoreContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMoreText: {
    marginTop: 5,
    color: theme.colors.secondary,
    fontSize: 12,
  },
});

export default Categories;
