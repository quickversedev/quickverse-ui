import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import mockOrdersResponse from '../../data/orders';
import {StackNavigationProp} from '@react-navigation/stack';
import {OrderStackParamList} from './OrderSNavigator';
import {OrderMetadata} from '../../data/orders';

type OrderStackNavigationProp = StackNavigationProp<
  OrderStackParamList,
  'OrderDetails' | 'WebView'
>;

const MyOrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<OrderMetadata[]>([]);
  const navigation = useNavigation<OrderStackNavigationProp>();

  useEffect(() => {
    setOrders(mockOrdersResponse.ordersMetadata);
  }, []);

  const handleCardPress = (order: OrderMetadata) => {
    // Check if orderId starts with "QV"
    if (order.orderId.startsWith('QV')) {
      navigation.navigate('OrderDetails', {order});
    } else {
      // Assuming you want to pass a URL for the WebView
      //const orderUrl = `https://example.com/order/${order.orderId}`; // Update this to match your desired URL structure
      navigation.navigate('WebView', {url: order.orderLink});
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
    padding: 16,
    borderRadius: 20, // Rounded corners
    margin: 16,
  },
  productImage: {
    width: 50,
    height: 50,
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
