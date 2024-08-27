import {RouteProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Button} from 'react-native';
// import {OrderStackParamList} from './OrdersNavigation';

import {StackNavigationProp} from '@react-navigation/stack';
import {OrderMetadata} from '../../data/orders';
import {OrderStackParamList} from './OrderSNavigator';

interface OrderDetailsProps {
  order?: OrderMetadata;
  route?: RouteProp<any, any>;
  navigation?: StackNavigationProp<any, any>;
}

const OrderDetailsScreen: React.FC<OrderDetailsProps> = ({route, order}) => {
  const {item: orderr} = route?.params?.order; // Get the order details passed from MyOrdersScreen
  console.log('osderrr:', orderr);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.status}>Order delivered!!!</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{orderr.customerName}</Text>
          <Text style={styles.address}>
            {orderr.customerDeliveryAddress || 'Address not provided'}
          </Text>
          <Text style={styles.deliveryTime}>
            Delivered on{' '}
            {/* {new Date(parseInt(order.creationTime)).toLocaleString()} */}
          </Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.sectionHeader}>Items in order</Text>
        <View style={styles.item}>
          <Image
            source={{uri: orderr.productImageUrls[0]}}
            style={styles.productImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{orderr.orderDescription}</Text>
            <Text style={styles.itemPrice}>${orderr.totalOrderAmount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryHeader}>Order Total</Text>
        <Text style={styles.summaryAmount}>${orderr.totalOrderAmount}</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.detailsHeader}>Order ID: #{orderr.orderId}</Text>
        <Text style={styles.detailsText}>
          Order Time: {new Date(parseInt(orderr.creationTime)).toLocaleString()}
        </Text>
        <Text style={styles.detailsText}>Store Name: {orderr.storeName}</Text>
        <Text style={styles.detailsText}>State Label: {orderr.stateLabel}</Text>
        <Text style={styles.detailsText}>State: {orderr.state}</Text>
        <Text style={styles.detailsText}>Product ID: {orderr.productId}</Text>
      </View>

      <Button
        title="Buy Again"
        color="#A52A2A"
        onPress={() => {
          // Add logic for the "Buy Again" functionality
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDC52',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A52A2A',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#FFE474',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A52A2A',
    marginBottom: 16,
  },
  customerInfo: {
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
    fontSize: 14,
    color: '#A52A2A',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A52A2A',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  itemDetails: {
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#A52A2A',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: '#A52A2A',
  },
  orderSummary: {
    backgroundColor: '#FFE474',
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
    fontSize: 14,
    color: '#A52A2A',
    marginBottom: 8,
  },
});

export default OrderDetailsScreen;
