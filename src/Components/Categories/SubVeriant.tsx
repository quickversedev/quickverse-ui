import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import theme from '../../theme';
import {Product} from '../../utils/canonicalModel';
import CartButton from './CartButton';

import {useSelector} from 'react-redux';
import {selectCart} from '../../services/cart/productCartSlice';

import {useProducts} from '../../services/Hooks/fetchSubProducts';

export interface ProductVariant extends Product {
  variantId: string;
  variantName: string;
  parentProductId: string;
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

export interface VariantDrawerProps {
  product: Product;
  onClose: () => void;
  disabled: boolean;
  storeOpen: boolean;
  vendorId: string;
  handleAddToCart: (item: Product) => void;
  handleIncreaseQuantity: (productId: string) => void;
  handleDecreaseQuantity: (productId: string) => void;
}

const VariantDrawer: React.FC<VariantDrawerProps> = ({
  product,
  onClose,
  disabled,
  storeOpen,
  vendorId,
  handleAddToCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}) => {
  const cartItems = useSelector(selectCart);
  const [selectedVariant, setSelectedVariant] = useState<Product | null>(null);
  const {products, loading, error, refetch} = useProducts({
    vendorId: vendorId,
    productId: product.productId,
  });

  const getQuantityForProduct = (productId: string) => {
    const itemInCart = cartItems.find(item => item.id === productId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const renderVariantItem = ({item}: {item: Product}) => {
    const isInStock = item.availability;
    const isProductOnSale =
      item.productSalePrice && item.productSalePrice !== item.productPrice;
    return (
      <TouchableOpacity
        style={[
          styles.variantItem,

          !isInStock && styles.disabledProductContainer,
        ]}
        onPress={() => setSelectedVariant(item)}
        activeOpacity={0.8}>
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

        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.title}
          </Text>
          {isProductOnSale && (
            <Text style={styles.originalPrice}>₹{item.productPrice}</Text>
          )}
          <Text style={styles.salePrice}> ₹{item.productSalePrice}</Text>
        </View>
        <View style={styles.priceAndCartContainer}>
          <View style={styles.cartButtonWrapper}>
            <CartButton
              quantity={getQuantityForProduct(item.productId)}
              onIncrease={() => handleIncreaseQuantity(item.productId)}
              onDecrease={() => handleDecreaseQuantity(item.productId)}
              onAdd={() => handleAddToCart(item)}
              added={getQuantityForProduct(item.productId) > 0}
              disabled={disabled || !storeOpen}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading && products.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading variants...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load variants</Text>
          <Text style={styles.errorSubText}>
            {typeof error === 'string' ? error : 'Please try again'}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={products}
        renderItem={renderVariantItem}
        keyExtractor={item => item.productId}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No variants available</Text>
          </View>
        }
      />
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.drawerOverlay}
        activeOpacity={1}
        onPress={onClose}>
        <View style={styles.drawerContainer}>
          <TouchableOpacity
            style={styles.drawerHandle}
            onPress={onClose}
            activeOpacity={0.8}>
            <View style={styles.handle} />
          </TouchableOpacity>

          <View style={styles.drawerContent}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.sectionTitle}>Select Variant:</Text>
            {renderContent()}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  drawerHandle: {
    padding: 10,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },

  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colors.ternary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: theme.colors.ternary,
  },
  variantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedVariantItem: {
    backgroundColor: '#f5f5f5',
  },
  variantInfo: {
    flex: 1,
    marginRight: 10,
  },
  variantText: {
    fontSize: 16,
    color: theme.colors.ternary,
  },
  variantSize: {
    fontSize: 14,
    color: theme.colors.ternary,
    marginTop: 4,
  },
  priceAndCartContainer: {
    alignItems: 'flex-end',
  },
  variantPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  cartButtonWrapper: {
    minWidth: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: theme.colors.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorSubText: {
    fontSize: 14,
    color: theme.colors.ternary,
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.ternary,
  },
  drawerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // maxHeight: '90%', // Maximum height
    height: 'auto', // Let it size to content
  },
  drawerContent: {
    padding: 20,
    // flex: 1, // Take up all available space
  },
  // Add a content container style for the FlatList
  contentContainer: {
    flexGrow: 1, // Allows content to grow but not exceed parent
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
  disabledProductContainer: {
    opacity: 0.5,
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
});

export default VariantDrawer;
