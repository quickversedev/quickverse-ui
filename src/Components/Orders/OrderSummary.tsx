import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import mockOrdersResponse from '../../data/orders';
import {OrderMetadata} from '../../data/orders';

const MyOrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<OrderMetadata[]>([]);

  useEffect(() => {
    setOrders(mockOrdersResponse.ordersMetadata);
  }, []);

  const handleCardPress = (order: OrderMetadata) => {
    if (order.orderLink) {
      Linking.openURL(order.orderLink).catch(err =>
        console.error('Failed to open link', err),
      );
    }
  };

  const renderOrderItem = (item: OrderMetadata) => (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => handleCardPress(item)}>
      <Image
        source={{uri: item.productImageUrls[0]}} // assuming the first image is to be displayed
        style={styles.productImage}
      />
      <View style={styles.orderDetails}>
        <Text style={styles.orderId}>ORDER : #{item.orderId}</Text>
        <Text style={styles.time}>
          {new Date(parseInt(item.creationTime, 10)).toLocaleDateString(
            'en-GB',
          )}{' '}
          {new Date(parseInt(item.creationTime, 10)).toLocaleTimeString(
            'en-GB',
          )}
        </Text>
        <Text style={styles.deliveryStatus}>
          {item.stateLabel.charAt(0).toUpperCase() + item.stateLabel.slice(1)}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#8B0000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={({item}) => renderOrderItem(item)}
        keyExtractor={item => item.orderId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDC52', // Background color of the screen
  },
  headerContainer: {
    backgroundColor: '#FFDC52', // Similar yellow color for the header
    paddingVertical: 20, // Vertical padding
    paddingHorizontal: 16, // Horizontal padding
    elevation: 3, // Slight shadow for depth
    alignItems: 'center', // Center align the text
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B0000', // Dark red color for the text
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcefb6', // Lighter card background color
    padding: 12,
    borderRadius: 20, // Rounded corners
    margin: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#8B0000',
    marginBottom: 4,
  },
  deliveryStatus: {
    fontSize: 14,
    color: '#8B0000',
    marginBottom: 4,
  },
});

export default MyOrdersScreen;
