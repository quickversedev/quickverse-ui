import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import mockOrdersResponse from 'F:/Qickverse/Orders/quickverse-ui/src/data/orders';

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const ordersWithStoreName = await Promise.all(
        mockOrdersResponse.ordersMetadata.map(async (order) => {
          const storeName = await fetchStoreNameFromAPI(order.orderLink);
          return {
            ...order,
            storeName: storeName
          };
        })
      );
      setOrders(ordersWithStoreName);
    };

    fetchData();
  }, []);

  const fetchStoreNameFromAPI = async (orderLink) => {
    try {
      const response = await fetch(orderLink);
      if (response.status === 403) {
        console.error('Access to the API is forbidden (403). Check your permissions.');
        return 'Unknown Store';
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return data.storeName || 'Unknown Store';
      } else {
        console.error('Expected JSON but received:', contentType);
        return 'Unknown Store';
      }
    } catch (error) {
      console.error('Error fetching store name:', error);
      return 'Unknown Store';
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderContainer} 
      onPress={() => navigation.navigate('OrderDetailsScreen', { order: item })}
    >
      <Image source={{ uri: item.productImageUrls[0] }} style={styles.productImage} />
      <View style={styles.orderDetails}>
        <Text style={styles.orderId}>ORDER : #{item.orderId}</Text>
        <Text style={styles.customerName}>Customer: {item.customerName}</Text>
        <Text style={styles.phoneNumber}>Phone: +{item.customerMobileNumber}</Text>
        <Text style={styles.deliveryAddress}>Address: {item.customerDeliveryAddress || 'Not provided'}</Text>
        <Text style={styles.stateLabel}>State: {item.stateLabel} ({item.state})</Text>
        <Text style={styles.time}>{new Date(parseInt(item.creationTime)).toLocaleString()}</Text>
        <Text style={styles.description}>Description: {item.orderDescription}</Text>
        <Text style={styles.storeName}>Store: {item.storeName}</Text>
        <Text style={styles.amount}>Amount: ${item.totalOrderAmount}</Text>
        <Text style={styles.count}>Count: {item.totalProductCount}</Text>
      </View>
      <MaterialCommunityIcons 
        name="chevron-right" 
        size={24} 
        color="#A52A2A" 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Orders</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.orderId.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDC52',
  },
  headerContainer: {
    backgroundColor: '#FFE474',
    paddingVertical: 16,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A52A2A',
    textAlign: 'center',
  },
  orderContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFE474',
    borderRadius: 15,
    padding: 16,
    margin: 16,
    marginVertical: 8,
    alignItems: 'center',
    borderColor: '#FFDC52',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
    width: Dimensions.get('window').width - 32,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 10,
  },
  orderDetails: {
    flex: 1,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#A52A2A',
  },
  customerName: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  stateLabel: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  time: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  description: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  storeName: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  amount: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
  count: {
    fontSize: 14,
    color: '#A52A2A',
    marginVertical: 2,
  },
});

export default MyOrdersScreen;
