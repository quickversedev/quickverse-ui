import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import theme from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../Vendors/VendorsNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {selectVendorEndpointById} from '../../services/VendorListSlice';
import {selectShopId} from '../../services/productCartSlice';

interface PaymentSummaryScreenProps {
  getTotalPrice: () => number;
}

type VendorCardsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebView'
>;

const PaymentSummaryScreen: React.FC<PaymentSummaryScreenProps> = ({
  getTotalPrice,
}) => {
  const shopId = useSelector(selectShopId);
  const vendorEndpoint = useSelector((state: RootState) =>
    selectVendorEndpointById(state, shopId),
  );
  const webUrl = vendorEndpoint ? `${vendorEndpoint}/cart` : '';
  const isCartEmpty = getTotalPrice() === 0;
  const navigation = useNavigation<VendorCardsNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.paymentSummary}>
        <Text style={styles.paymentSummaryText}>Payment Summary</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Order Total</Text>
          <Text style={styles.paymentValue}>Rs.{getTotalPrice()}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>Rs.{getTotalPrice()}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            {backgroundColor: isCartEmpty ? 'gray' : theme.colors.secondary},
          ]}
          disabled={isCartEmpty && !vendorEndpoint}
          onPress={() => navigation.navigate('WebView', {url: webUrl})}>
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  paymentSummary: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  placeOrderButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  paymentSummaryText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  paymentLabel: {
    fontSize: 16,
    color: 'black',
  },
  paymentValue: {
    fontSize: 16,
    color: 'black',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  placeOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default PaymentSummaryScreen;
