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
  SubProduct,
  SubProductModalUnit,
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
  const {
    products,
    categories,
    loading, // True while either products or categories are loading
    productsLoading, // True only while products are loading
    categoriesLoading, // True only while categories are loading
    error,
    refetch,
  } = useFetchProductsAndCategories(vendor.vendorId);
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
    console.log('handleAddToCartOrOpenSubModal called');

    const hasVariants = productItem.productSize !== '1';

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
    .sort((a, b) => {
      // Sort in-stock items (availability = true) before out-of-stock items
      if (a.availability === b.availability) return 0;
      return a.availability ? -1 : 1;
    });
  console.log('filtered products:', filteredProducts);
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
        dispatch(
          addToCart(
            {
              id: product.id,
              name: product.name,
              productPrice: product.productPrice,
              salePrice: product.salePrice,
              quantity: 1,
              // quantity: product.quantity || 1,
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
    console.log('Varient_count:', item.productSize);

    const isInStock = item.availability;
    let hasVariants = false; // Your logic for hasVariants
    if (
      typeof item.productSize === 'string' &&
      item.productSize.trim() !== ''
    ) {
      if (item.productSize !== '1') {
        hasVariants = true;
      }
    }

    const currentCartItem = cartItems[item.productId];
    const quantityInCart = currentCartItem?.quantity || 0;

    return (
      <View
        style={[
          styles.productContainer,
          (!storeOpen || !isInStock) && styles.disabledProductContainer,
        ]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: item.productImageLink}}
            style={styles.productImage}
            resizeMode="cover"
          />
          {!isInStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.title}
          </Text>
          {item.productSize && hasVariants && (
            <Text style={{color: 'grey'}}>{item.productSize}</Text>
          )}
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>₹{item?.productPrice}</Text>

            <Text style={styles.salePrice}>₹{item?.productSalePrice}</Text>
          </View>
        </View>

        {/* Cart Button Area */}
        <View style={{position: 'absolute', bottom: 8, right: 0}}>
          <CartButton
            quantity={quantityInCart}
            onIncrease={() => {
              if (hasVariants) {
                handleAddToCartOrOpenSubModal(item);
              } else {
                handleIncreaseQuantity(item.productId);
              }
            }}
            // onDecrease={() => {
            //   if (quantityInCart > 0) handleDecreaseQuantity(item.productId);
            // }}
            onDecrease={() => handleDecreaseQuantity(item.productId)}
            onAdd={() => handleAddToCartOrOpenSubModal(item)}
            added={quantityInCart > 0}
            // isVariantProduct={hasVariants}
            disabled={!storeOpen || !isInStock || loading || !!error}
          />
        </View>
      </View>
    );
  };

  const subProductModalUnits: SubProductModalUnit[] = useMemo(() => {
    console.log('selectedProductForVariants:::', selectedProductForVariants);
    console.log('currentSubProducts:::', currentSubProducts); //[]

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

  // if (loading && !products.length && !categories.length) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color={theme.colors.ternary} />
  //       <Text style={styles.loaderText}>Loading products...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <MaterialCommunityIcons
  //         name="alert-circle-outline"
  //         size={48}
  //         color={theme.colors.error}
  //       />
  //       <Text style={styles.errorText}>Failed to load products</Text>
  //       <Text style={styles.errorSubText}>Please try again later</Text>
  //       <TouchableOpacity style={styles.retryButton} onPress={refetch}>
  //         <Text style={styles.retryButtonText}>Retry</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  if (loading && !products.length && !categories.length) {
    // Use 'loading'
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.ternary} />
        <Text style={styles.loaderText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    // Use 'error'
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={48}
          color={theme.colors.error}
        />
        <Text style={styles.errorText}>Failed to load products</Text>
        <Text style={styles.errorSubText}>
          {typeof error === 'string' ? error : 'Please try again later.'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      {/* store-Status Banner */}
      {!storeOpen && (
        <View style={styles.storeClosedBanner}>
          <Text style={styles.storeClosedText}>Store is Closed</Text>
        </View>
      )}

      {/* Header Section (Search and Cart Button) */}
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
            placeholderTextColor={theme.colors.secondary} // Use theme color
            value={searchQuery}
            onChangeText={setSearchQuery}
            editable={!loading && !error} // Use 'loading' and 'error' from useFetchProductsAndCategories
          />
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setModalVisible(true)} // setModalVisible is for CartScreen
          disabled={loading || !!error} // Use 'loading' and 'error'
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color="#FFDC52" // Or theme.colors.iconOnSecondary
          />
          {totalCartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        {/* Vendor Details Banner (Animated) */}
        {showBanner && (
          <Animated.View style={{transform: [{translateY: bannerTranslateY}]}}>
            <VendorDetails vendor={vendor} />
          </Animated.View>
        )}

        {/* Categories and Products Lists */}
        <View style={styles.contentContainer}>
          <View style={styles.categoriesListContainer}>
            {categoriesLoading && categories.length === 0 ? (
              <View style={styles.sectionLoading}>
                <ActivityIndicator size="small" color={theme.colors.ternary} />
                <Text style={styles.sectionLoadingText}>
                  Loading categories...
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredCategories}
                renderItem={renderCategoryItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll} // Ensure handleScroll is memoized if performance is an issue
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
            )}
          </View>

          <View style={styles.separator} />

          <View style={styles.productsListContainer}>
            {productsLoading && products.length === 0 ? (
              <View style={styles.sectionLoading}>
                <ActivityIndicator size="small" color={theme.colors.ternary} />
                <Text style={styles.sectionLoadingText}>
                  Loading products...
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.productId}
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
                contentContainerStyle={
                  filteredProducts.length === 0
                    ? styles.emptyProductList
                    : undefined // Apply only if empty
                }
                onScroll={handleScroll} // Ensure handleScroll is memoized
                scrollEventThrottle={100}
                ListEmptyComponent={() =>
                  // Provide a function for ListEmptyComponent
                  !productsLoading && products.length > 0 ? ( // Only show if not loading and products were fetched
                    <Text style={styles.noProductsText}>
                      {searchQuery
                        ? 'No products match your search'
                        : 'No products in this category'}
                    </Text>
                  ) : null
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
        </View>
      </View>

      {/* Main Cart Modal */}
      <CartScreen
        modalVisible={modalVisible} // This was state for CartScreen modal
        closeCartModal={() => setModalVisible(false)}
      />

      {/* Vendor Conflict Confirmation Modal */}
      <CustomConfirmationModal
        isVisible={isConfirmationModalVisible}
        onConfirm={handleConfirmAddToCart}
        onCancel={handleCancelAddToCart}
      />

      {/* --- SubProductModal (This was missing) --- */}
      {selectedProductForVariants && ( // Only render if a parent product is selected for variants
        <SubProductModal
          visible={isSubProductModalVisible}
          onClose={() => {
            setIsSubProductModalVisible(false);
            setSelectedProductForVariants(null);
            dispatch(clearSubProducts()); // Important: Clear sub-product state
          }}
          title={`Select unit for ${selectedProductForVariants.title}`}
          units={subProductModalUnits} // The memoized and transformed list of variants
          isLoading={subProductsLoading} // Loading state for fetching sub-products
          error={subProductsError} // Error state for fetching sub-products
          onAdd={(selectedUnitId, quantity) => {
            // Callback when a variant is added from the modal
            const selectedUnit = subProductModalUnits.find(
              u => u.id === selectedUnitId,
            );

            if (
              selectedUnit?.originalSubProduct &&
              selectedProductForVariants
            ) {
              const variantCartItem: ProductCartItems = {
                id: selectedUnit.originalSubProduct.id, // Use the sub-product's (variant's) unique ID
                parentId: selectedProductForVariants.productId, // Link to the parent product
                name: `${selectedProductForVariants.title} (${
                  selectedUnit.originalSubProduct.label ||
                  selectedUnit.originalSubProduct.name ||
                  ''
                })`, // Descriptive name
                productPrice: selectedUnit.originalSubProduct.price,
                salePrice:
                  selectedUnit.originalSubProduct.discountedPrice ||
                  selectedUnit.originalSubProduct.price,
                quantity: quantity || 1, // Use quantity from modal, default to 1
                image:
                  selectedUnit.originalSubProduct.image ||
                  selectedProductForVariants.productImageLink, // Variant image or fallback
                vendorId: selectedProductForVariants.vendorId,
              };
              handleAddToCart(variantCartItem); // Use your existing debounced add to cart logic
              setIsSubProductModalVisible(false);
              setSelectedProductForVariants(null);
              dispatch(clearSubProducts());
            } else {
              Alert.alert(
                'Error',
                'Could not add the selected variant. Please try again.',
              );
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
});

export default Categories;
