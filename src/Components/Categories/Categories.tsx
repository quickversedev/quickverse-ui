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
  Animated,
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
  SubProduct, // Import SubProduct
  SubProductModalUnit, // Import SubProductModalUnit
} from '../../utils/canonicalModel';

import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  clearFromCart,
  decrementQuantity,
  incrementQuantity,
  selectCart,
} from '../../services/cart/productCartSlice';

import SubProductModal from '../../Components/SubProductsModal'; // Ensure path is correct
import {
  fetchSubProducts,
  clearSubProducts,
} from '../../services/subProductSlice'; // Import sub-product actions

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

type CategoriesScreenProps = {
  route: RouteProp<RootStackParamList, 'Categories'>;
};

const Categories: React.FC<CategoriesScreenProps> = ({route}) => {
  const {authData, setSkipLogin} = useAuth();
  const vendor: Vendor = route.params.vendor;
  const {products, categories, loading, error, refetch} =
    useFetchProductsAndCategories(vendor.vendorId);
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    refetch().then(() => {
      setRefreshing(false);
    });
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
  const cart = useSelector(selectCart);

  const [showBanner, setShowBanner] = useState(true);
  const bannerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const [selectedProductForVariants, setSelectedProductForVariants] =
    useState<Product | null>(null);
  const [isSubProductModalVisible, setIsSubProductModalVisible] =
    useState(false);

  // Get sub-product state from Redux
  const {
    currentSubProducts,
    loading: subProductsLoading,
    error: subProductsError,
    currentParentProductId,
  } = useSelector((state: RootState) => state.subProducts);

  const handleAddToCartOrOpenSubModal = (productItem: Product) => {
    // Use an explicit flag like productItem.hasVariants if available from your API
    // Otherwise, fall back to checking productSize or if subProducts are pre-loaded
    const hasVariants =
      productItem.hasVariants === true ||
      (productItem.productSize && productItem.productSize.length > 1);

    if (hasVariants) {
      setSelectedProductForVariants(productItem);
      setIsSubProductModalVisible(true);
      if (authData && vendor?.vendorId) {
        // Ensure authData and vendorId are available
        dispatch(
          fetchSubProducts({
            authData: authData.sessionKey, // Or however you access the token
            vendorId: vendor.vendorId,
            parentProductId: productItem.productId,
          }),
        );
      } else {
        Alert.alert(
          'Error',
          'Cannot fetch product variants. Authentication or vendor details missing.',
        );
        setIsSubProductModalVisible(false); // Don't open modal if essential data is missing
        setSelectedProductForVariants(null);
      }
    } else {
      // Product has no variants, proceed with direct add to cart
      const cartProduct: ProductCartItems = {
        id: productItem.productId,
        name: productItem.title,
        productPrice: productItem.productPrice,
        salePrice: productItem.productSalePrice,
        quantity: 1,
        image: productItem.productImageLink,
        vendorId: productItem.vendorId,
      };
      handleAddToCart(cartProduct); // Your existing debounced add to cart
    }
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    lastScrollY.current = offsetY;
    Keyboard.dismiss();
    if (offsetY > 10 && showBanner) {
      Animated.timing(bannerTranslateY, {
        toValue: -500,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowBanner(false));
    } else if (offsetY <= 10 && !showBanner) {
      setShowBanner(true);
      Animated.timing(bannerTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

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

  const baseFilteredProducts = searchQuery
    ? (products || []).filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : selectedCategory
    ? (products || []).filter(product =>
        selectedCategory === 'other'
          ? !categoriesWithProducts.some(cat => cat.id === product.category)
          : product.category === selectedCategory,
      )
    : products || []; // Get the array to be sorted

  // Now, create a copy of baseFilteredProducts and then sort it
  const filteredProducts = [...baseFilteredProducts].sort((a, b) => {
    // Sort in-stock items (availability = true) before out-of-stock items
    if (a.availability === b.availability) {
      return 0; // Keep original relative order if availability is the same
    }
    return a.availability ? -1 : 1; // true (in-stock) comes before false (out-of-stock)
  });

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
    // ... (your existing logic for auth check, store open, vendor conflict)
    if (!authData) {
      /* ... */ return;
    }
    if (storeOpen) {
      if (cart.length > 0 && cart[0].vendorId !== product.vendorId) {
        setProductToAdd(product);
        setConfirmationModalVisible(true);
      } else {
        dispatch(
          addToCart(
            {
              id: product.id, // This should be the specific sub-product ID if applicable
              parentId: product.parentId, // Add parentId if it's a variant
              name: product.name,
              productPrice: product.productPrice,
              salePrice: product.salePrice,
              quantity: product.quantity || 1,
              image: product.image,
              vendorId: product.vendorId,
            },
            authData, // Pass authData to cart actions if they need it for backend sync
          ),
        );
      }
    }
  }, 300);

  const handleConfirmAddToCart = () => {
    if (productToAdd) {
      if (authData) {
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
    // ... (isInStock, currentCartItem, isProductOnSale)
    const currentCartItem = cartItems[item.productId];
    const displayProductForCartButton: ProductCartItems = {
      id: item.productId,
      name: item.title,
      productPrice: item.productPrice,
      salePrice: item.productSalePrice,
      quantity: currentCartItem?.quantity || 0, // Show quantity of parent if no variants selected yet
      image: item.productImageLink,
      vendorId: item.vendorId,
    };
    return (
      <View /* ... productContainer ... */>
        {/* ... Image, Details ... */}
        <View style={{position: 'absolute', bottom: 8, right: 0}}>
          <CartButton
            quantity={displayProductForCartButton.quantity}
            // For +/- on the main product card, it should probably still affect the "default" or main item,
            // or be disabled if variants must be chosen. This depends on your UX.
            // For simplicity, let's assume +/- here operate on the main product ID if it's already in cart.
            onIncrease={() => handleIncreaseQuantity(item.productId)}
            onDecrease={() => handleDecreaseQuantity(item.productId)}
            onAdd={() => handleAddToCartOrOpenSubModal(item)} // This now handles variant logic
            added={displayProductForCartButton.quantity > 0}
            disabled={!storeOpen || !item.availability || loading || !!error}
          />
        </View>
      </View>
    );
  };

  const subProductModalUnits: SubProductModalUnit[] = useMemo(() => {
    if (!selectedProductForVariants || currentSubProducts.length === 0)
      return [];
    // Only map if the loaded subProducts match the selected parent product
    if (currentParentProductId !== selectedProductForVariants.productId)
      return [];

    return currentSubProducts.map(sub => ({
      id: sub.id,
      label: sub.label,
      volume: sub.volume,
      price: sub.price,
      discountedPrice: sub.discountedPrice,
      image: sub.image || selectedProductForVariants.productImageLink, // Fallback to parent image
      originalSubProduct: sub, // Keep the original sub-product data
    }));
  }, [currentSubProducts, selectedProductForVariants, currentParentProductId]);

  // Calculate total number of items in the cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
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
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      {/* store-Status */}
      {!storeOpen && (
        <View style={styles.storeClosedBanner}>
          <Text style={styles.storeClosedText}>Store is Closed</Text>
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

      <View style={{flex: 1}}>
        {/* vendor-banner */}
        {showBanner && (
          <Animated.View style={{transform: [{translateY: bannerTranslateY}]}}>
            <VendorDetails vendor={vendor} />
          </Animated.View>
        )}

        {/* Categories and Products */}
        <View style={styles.contentContainer}>
          {/* Categories */}
          <View style={styles.categoriesListContainer}>
            <FlatList
              data={filteredCategories}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={100}
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
          </View>

          {/* seperator-line */}
          <View style={styles.separator} />

          {/* products */}
          <View style={styles.productsListContainer}>
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.productId}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode="on-drag"
              contentContainerStyle={
                filteredProducts.length === 0 && styles.emptyProductList
              }
              onScroll={handleScroll}
              scrollEventThrottle={100}
              ListEmptyComponent={
                <Text style={styles.noProductsText}>
                  {searchQuery
                    ? 'No products match your search'
                    : 'No products available in this category'}
                </Text>
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

      {selectedProductForVariants && ( // Ensure a product is selected before trying to render modal
        <SubProductModal
          visible={isSubProductModalVisible}
          onClose={() => {
            setIsSubProductModalVisible(false);
            setSelectedProductForVariants(null);
            dispatch(clearSubProducts()); // Clear sub-product state when modal closes
          }}
          title={`Select unit for ${selectedProductForVariants.title}`}
          units={subProductModalUnits}
          isLoading={subProductsLoading} // Pass loading state to modal
          error={subProductsError} // Pass error state to modal
          onAdd={selectedUnitId => {
            // Assuming onAdd from modal gives just the ID of the selected SubProductModalUnit
            const selectedUnitOriginal = subProductModalUnits.find(
              u => u.id === selectedUnitId,
            )?.originalSubProduct;

            if (selectedUnitOriginal && selectedProductForVariants) {
              const variantCartItem: ProductCartItems = {
                id: selectedUnitOriginal.id, // Use the sub-product's unique ID
                parentId: selectedProductForVariants.productId, // Link to parent product
                name: `${selectedProductForVariants.title} (${selectedUnitOriginal.label})`,
                productPrice: selectedUnitOriginal.price,
                salePrice:
                  selectedUnitOriginal.discountedPrice ||
                  selectedUnitOriginal.price,
                quantity: 1, // Add one specific variant
                image:
                  selectedUnitOriginal.image ||
                  selectedProductForVariants.productImageLink,
                vendorId: selectedProductForVariants.vendorId,
              };
              handleAddToCart(variantCartItem); // Add the specific variant to cart
              setIsSubProductModalVisible(false);
              setSelectedProductForVariants(null);
              dispatch(clearSubProducts());
            } else {
              Alert.alert('Error', 'Could not find selected variant details.');
            }
          }}
        />
      )}
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
  contentContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
});

export default Categories;
