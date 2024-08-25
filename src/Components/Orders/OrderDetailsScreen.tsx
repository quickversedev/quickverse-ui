import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params; // Get the order details passed from MyOrdersScreen

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.status}>Order delivered!!!</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.address}>{order.customerDeliveryAddress || 'Address not provided'}</Text>
          <Text style={styles.deliveryTime}>Delivered on {new Date(order.creationTime).toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.sectionHeader}>Items in order</Text>
        <View style={styles.item}>
          <Image source={{ uri: order.productImageUrls[0] }} style={styles.productImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{order.orderDescription}</Text>
            <Text style={styles.itemPrice}>{order.totalOrderAmount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryHeader}>Order Total</Text>
        <Text style={styles.summaryAmount}>${order.totalOrderAmount}</Text>
      </View>

      {/* Updated Order Details Section */}
      <View style={styles.orderDetailsContainer}>
        <Text style={styles.detailsHeader}>Order ID: #{order.orderId}</Text>
        <Text style={styles.detailsText}>Order Time: {new Date(order.creationTime).toLocaleString()}</Text>
        <Text style={styles.detailsText}>Store Name: {order.storeName}</Text>
        <Text style={styles.detailsText}>State Label: {order.stateLabel}</Text>
        <Text style={styles.detailsText}>State: {order.state}</Text>
        <Text style={styles.detailsText}>Product ID: {order.productId}</Text>
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
