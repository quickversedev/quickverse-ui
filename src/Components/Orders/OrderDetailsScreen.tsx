// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {RouteProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {OrderStackParamList} from './OrderSNavigator';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have installed react-native-vector-icons

interface OrderDetailsProps {
  route: RouteProp<OrderStackParamList, 'OrderDetails'>;
  navigation: StackNavigationProp<OrderStackParamList, 'OrderDetails'>;
}

const OrderDetailsScreen: React.FC<OrderDetailsProps> = ({
  route,
  navigation,
}) => {
  const order = route.params.order;

  // Extract store name from orderLink
  const extractStoreName = (url: string): string => {
    const urlParts = url.split('/');
    return urlParts[3] || 'Unknown Store'; // Assuming the store name is the fourth part of the URL
  };

  const storeName = extractStoreName(order.orderLink);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#A52A2A" />
        </TouchableOpacity>
        <Text style={styles.header}>Order Details</Text>
      </View>

      {/* Order Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Order delivered!!!</Text>
        <Icon name="checkmark-circle" size={28} color="#A52A2A" />
      </View>

      {/* Customer Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.customerName}>{order.customerName}</Text>
        <Text style={styles.address}>
          {order.customerDeliveryAddress || 'Address not provided'}
        </Text>
        <Text style={styles.deliveryTime}>
          Delivered on{' '}
          {new Date(parseInt(order.creationTime, 10)).toLocaleString()}
        </Text>
      </View>

      {/* Items */}
      <View style={styles.itemsContainer}>
        <Text style={styles.sectionHeader}>Items in order</Text>
        {order.productImageUrls.map((imageUrl, index) => (
          <View key={index} style={styles.item}>
            <Image source={{uri: imageUrl}} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{order.orderDescription}</Text>
              <Text style={styles.itemPrice}>€{order.totalOrderAmount}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.summaryHeader}>Order Total</Text>
        <Text style={styles.summaryAmount}>€{order.totalOrderAmount}</Text>
      </View>

      {/* Order Details */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.detailsHeader}>Order ID: #{order.orderId}</Text>
        <Text style={styles.detailsText}>
          Order Time:{' '}
          {new Date(parseInt(order.creationTime, 10)).toLocaleString()}
        </Text>
        <Text style={styles.detailsText}>Store Name: {storeName}</Text>
        <Text style={styles.detailsText}>State Label: {order.stateLabel}</Text>
        <Text style={styles.detailsText}>State: {order.state}</Text>
        <Text style={styles.detailsText}>Product ID: {order.productId}</Text>
      </View>

      <TouchableOpacity
        style={styles.buyAgainButton}
        onPress={() => {
          /* Buy Again Logic */
        }}>
        <Text style={styles.buyAgainButtonText}>BUY AGAIN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDC52',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFDC52',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    marginRight: 85,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A52A2A',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fcefb6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  status: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A52A2A',
  },
  infoContainer: {
    backgroundColor: '#fcefb6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  customerName: {
    fontSize: 18,
    color: '#A52A2A',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#A52A2A',
    marginBottom: 8,
  },
  deliveryTime: {
    fontSize: 16,
    color: '#A52A2A',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A52A2A',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  itemDetails: {
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#A52A2A',
    marginBottom: 8,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#A52A2A',
  },
  orderSummary: {
    backgroundColor: '#fcefb6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A52A2A',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A52A2A',
  },
  orderDetailsContainer: {
    marginBottom: 16,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A52A2A',
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    color: '#A52A2A',
    marginBottom: 8,
  },
  buyAgainButton: {
    backgroundColor: '#A52A2A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyAgainButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderDetailsScreen;
