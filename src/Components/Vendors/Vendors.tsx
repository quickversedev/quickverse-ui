// src/components/HorizontalCardList.tsx
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AppHeader from '../util/AppHeader';
import VendorCards from './vendorCards';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import CartScreen from '../Cart/CartScreen';

const Vendors: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        {/* Header with Cart Icon */}
        <View style={styles.headerContainer}>
          <AppHeader headerText="Vendors" />
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
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 50,
    width: 50,
    borderRadius: 15,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Vendors;
