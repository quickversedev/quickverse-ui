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
// import {OrderStackParamList} from './OrdersNavigation';
import {OrderStackParamList} from './OrderSNavigator';
import {OrderMetadata} from '../../data/orders';

type OrderStackNavigationProp = StackNavigationProp<
  OrderStackParamList,
  'OrderDetails'
>;

const MyOrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<OrderMetadata[]>([]);
  const navigation = useNavigation<OrderStackNavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      const ordersWithStoreName = await Promise.all(
        mockOrdersResponse.ordersMetadata.map(async order => {
          const storeName = await fetchStoreNameFromAPI(order.orderLink);
          return {
            ...order,
            storeName,
          };
        }),
      );
      setOrders(ordersWithStoreName);
    };

    fetchData();
  }, []);

  const fetchStoreNameFromAPI = async (orderLink: string) => {
    try {
      const response = await fetch(orderLink);
      if (response.status === 403) {
        console.error(
          'Access to the API is forbidden (403). Check your permissions.',
        );
        return 'Unknown Store';
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
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
  const handleCardPress = (order: OrderMetadata) => {
    navigation.removeListener;
    navigation.navigate('OrderDetails', {order});
  };
  const renderOrderItem = (item: OrderMetadata) => (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => handleCardPress(item)}>
      {/* <Image
        source={{uri: item.productImageUrls[0]}}
        style={styles.productImage}
      /> */}
      <View style={styles.orderDetails}>
        <Text style={styles.orderId}>ORDER : #{item.orderId}</Text>
        <Text style={styles.customerName}>Customer: {item.customerName}</Text>
        <Text style={styles.phoneNumber}>
          Phone: +{item.customerMobileNumber}
        </Text>
        <Text style={styles.deliveryAddress}>
          Address: {item.customerDeliveryAddress || 'Not provided'}
        </Text>
        <Text style={styles.stateLabel}>
          State: {item.stateLabel} ({item.state})
        </Text>
        <Text style={styles.time}>
          {new Date(parseInt(item.creationTime)).toLocaleString()}
        </Text>
        <Text style={styles.description}>
          Description: {item.orderDescription}
        </Text>
        <Text style={styles.storeName}>Store: {item.customerName}</Text>
        <Text style={styles.amount}>Amount: ${item.totalOrderAmount}</Text>
        <Text style={styles.count}>Count: {item.totalProductCount}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#A52A2A" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
    backgroundColor: '#FFF1C1',
    padding: 16,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE474',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A52A2A',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 14,
    color: '#A52A2A',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#A52A2A',
    marginBottom: 4,
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#A52A2A',
    marginBottom: 4,
  },
  stateLabel: {
    fontSize: 14,
    color: '#A52A2A',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#A52A2A',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#A52A2A',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 14,
    color: '#A52A2A',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A52A2A',
  },
  count: {
    fontSize: 12,
    color: '#A52A2A',
  },
});

export default MyOrdersScreen;
