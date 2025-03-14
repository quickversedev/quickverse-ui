// src/components/HorizontalCardList.tsx
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import AppHeader from '../util/AppHeader';
import VendorCards from './vendorCards';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import CartScreen from '../Cart/CartScreen';
import {useSelector} from 'react-redux';
import {selectCart} from '../../services/cart/productCartSlice';

const Vendors: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const cart = useSelector(selectCart);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {/* Header with Cart Icon */}
        <View style={styles.headerContainer}>
          {/* <AppHeader headerText="Vendors" /> */}

          <View style={styles.shopHeader}>
            <Text style={styles.shopName}>Vendors</Text>
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

        {/* Vendor Cards */}
        <VendorCards />

        {/* Cart Modal */}
        <CartScreen
          modalVisible={modalVisible}
          closeCartModal={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },

  container: {
    backgroundColor: theme.colors.primary,
    marginBottom: 45,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 10,
  },

  // Header Styles
  shopHeader: {
    backgroundColor: theme.colors.secondary,
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
});

export default Vendors;
