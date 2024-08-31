import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrderStackParamList } from './OrderSNavigator';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have installed react-native-vector-icons

interface OrderDetailsProps {
  route: RouteProp<OrderStackParamList, 'OrderDetails'>;
  navigation: StackNavigationProp<OrderStackParamList, 'OrderDetails'>;
}

const OrderDetailsScreen: React.FC<OrderDetailsProps> = ({ route, navigation }) => {
  const order = route.params.order;

  // Extract store name from orderLink
  const extractStoreName = (url: string): string => {
    const urlParts = url.split('/');
    return urlParts[3] || 'Unknown Store'; // Assuming the store name is the fourth part of the URL
  };

  const storeName = extractStoreName(order.orderLink);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="#A52A2A" />
        </TouchableOpacity>
        <Text style={styles.header}>Order Details</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.status}>Order Status: {order.stateLabel}</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.address}>
            {order.customerDeliveryAddress || 'Address not provided'}
          </Text>
          <Text style={styles.deliveryTime}>
            Delivered on {new Date(parseInt(order.creationTime)).toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.sectionHeader}>Items in order</Text>
        {order.productImageUrls.map((imageUrl, index) => (
          <View key={index} style={styles.item}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.productImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{order.orderDescription}</Text>
              <Text style={styles.itemPrice}>${order.totalOrderAmount}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.summaryHeader}>Order Total</Text>
        <Text style={styles.summaryAmount}>${order.totalOrderAmount}</Text>
      </View>

      <View style={styles.orderDetailsContainer}>
        <Text style={styles.detailsHeader}>Order ID: #{order.orderId}</Text>
        <Text style={styles.detailsText}>
          Order Time: {new Date(parseInt(order.creationTime)).toLocaleString()}
        </Text>
        <Text style={styles.detailsText}>Store Name: {storeName}</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFDC52',
    paddingVertical: 20,
    paddingHorizontal: 5,
    elevation: 3,
  },
  backButton: {
    marginRight: 85,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A52A2A',
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
