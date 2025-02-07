import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
  SafeAreaView,
} from 'react-native';

import CartButton from './CartButton';
import theme from '../../theme';
import {useFetchProductsAndCategories} from '../../services/Hooks/fetchProductAndCategory';
import {ProductCartItems} from '../../utils/canonicalModel';
import {Product} from '../../data/mockProductData';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToProductCart,
  decrementProductQuantity,
  incrementProductQuantity,
  selectCart,
  selectShopId,
} from '../../services/productCartSlice';
import {Category} from '../../data/mockCategoriesData';
import CartScreen from '../Cart/CartScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Categories = () => {
  const {products, categories, loading, error} =
    useFetchProductsAndCategories();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0]?.id,
  );
  const [cartItems, setCartItems] = useState<{[key: string]: ProductCartItems}>(
    {},
  );
  const [modalVisible, setModalVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(1000)).current;
  const closeCartModal = () => {
    Animated.timing(animationValue, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };
  const cart = useSelector(selectCart);
  const shopId = useSelector(selectShopId);

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

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Error loading data</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    );
  }

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = (product: ProductCartItems) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [product.id]: {
        ...product,
        quantity: (prevItems[product.id]?.quantity || 0) + 1,
      },
    }));
    dispatch(
      addToProductCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        shopId: product.shopId,
      }),
    );
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(incrementProductQuantity({id: productId}));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decrementProductQuantity({id: productId}));
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const renderCategoryItem = ({item}: {item: Category}) => {
    const isSelected = item.id === selectedCategory;

    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          isSelected && styles.selectedCategoryContainer, // Apply selected style
        ]}
        onPress={() => handleCategoryPress(item.id)}>
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
    const product: ProductCartItems = {
      id: item.sku,
      name: item.name,
      price: item.sellingPrice,
      quantity: cartItems[item.sku]?.quantity || 0,
      image: item.productImageUrl,
      shopId: item.shopId,
    };

    return (
      <View style={styles.productContainer}>
        <Image
          source={{uri: product.image}}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>₹{product.price}</Text>
          <Text style={styles.productRating}>R: N/A</Text>
        </View>
        <CartButton
          quantity={product.quantity}
          onIncrease={() => handleIncreaseQuantity(product.id)}
          onDecrease={() => handleDecreaseQuantity(product.id)}
          onAdd={() => handleAddToCart(product)}
          added={product.quantity > 0}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <CartScreen modalVisible={modalVisible} closeCartModal={closeCartModal} />

      <View style={styles.container}>
        <View style={styles.container1}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.container2}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.shopHeader}>
              <Text style={styles.shopName}>Paaji Ki Rasoi</Text>
            </View>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color="#FFDC52"
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.sku}
            numColumns={1}
            contentContainerStyle={styles.productList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 0 : 20, // Account for iOS notch and status bar
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: 10,
  },
  line: {
    width: 1,
    backgroundColor: 'black',
    marginLeft: 5,
    marginVertical: 22,
  },
  container1: {
    width: '27%',
    flexShrink: 1,
    paddingTop: 60,
  },
  container2: {
    flex: 1,
  },
  title: {
    width: '100%',
    height: 50,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    borderRadius: 100,
    padding: 15,
    textAlign: 'center',
  },
  categoryContainer: {
    height: 100,
    width: 95,
    padding: 5,
    marginBottom: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3C200',
    flexShrink: 1,
    backgroundColor: theme.colors.primary,
  },
  selectedCategoryContainer: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.ternary,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 6,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 5,
  },
  productContainer: {
    flex: 1,
    margin: 7,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    width: 260,
    height: 95,
    backgroundColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  productDetails: {
    flex: 1,
    paddingLeft: 7,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 17,
    color: '#103E60',
    fontWeight: '900',
  },
  productPrice: {
    fontSize: 18,
    color: '#8F1413',
    fontWeight: '900',
  },
  productRating: {
    fontSize: 14,
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
  cartButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 10,
  },
  shopHeader: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.ternary,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8F1413',
    textTransform: 'uppercase',
  },
});

export default Categories;
