import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {fetchOrders} from '../../services/cart/OrdersSlice';
import ZeroOrdersState from './ZeroOrderState';
import {OrderMetadata} from '../../utils/canonicalModel';
import {OrderStackParamList} from './OrdersNavigator';

type OrderStackNavigationProp = StackNavigationProp<
  OrderStackParamList,
  'OrderDetails' | 'WebView'
>;

const MyOrdersScreen: React.FC = () => {
  const navigation = useNavigation<OrderStackNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {orders, loading, cursor, error} = useSelector(
    (state: RootState) => state.orders,
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders(null)); // Fetch initial orders
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchOrders(null)); // Refresh orders
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (cursor && !loading) {
      dispatch(fetchOrders(cursor)); // Fetch next page using the cursor
    }
  };

  const handleCardPress = (order: OrderMetadata) => {
    if (order.orderId.startsWith('QV')) {
      navigation.navigate('OrderDetails', {order});
    } else {
      navigation.navigate('WebView', {url: order.orderLink});
    }
  };
  const hasZeroOrders = orders.length === 0 && !loading && !error;
  const renderOrderItem = ({item}: {item: OrderMetadata}) => (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() => handleCardPress(item)}>
      <View style={styles.imageContainer}>
        {item.productImageUrls.slice(0, 4).map((url, index) => (
          <Image key={index} source={{uri: url}} style={styles.productImage} />
        ))}
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderId}>ORDER : #{item.orderId}</Text>
        <Text style={styles.orderDescription}>{item.orderDescription}</Text>
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
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color="#8B0000"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color="#8B0000"
          style={styles.footerLoader}
        />
      );
    }
    if (cursor) {
      return (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMore}
          disabled={loading}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>My Orders</Text>
        </View>
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>
            Failed to fetch the order, please try again later..!
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      {hasZeroOrders ? (
        <ZeroOrdersState />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.orderId.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={renderFooter} // Render footer at the end of the list
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFDC52'},
  headerContainer: {
    backgroundColor: '#FFDC52',
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 3,
    alignItems: 'center',
  },
  headerText: {fontSize: 24, fontWeight: 'bold', color: '#8B0000'},
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDC52',
  },
  loaderText: {fontSize: 18, fontWeight: 'bold', color: '#8B0000'},
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcefb6',
    borderRadius: 20,
    margin: 16,
    position: 'relative',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    width: 80,
  },
  productImage: {width: 30, height: 30, margin: 2},
  orderDetails: {flex: 1, marginLeft: 10, marginVertical: 10},
  orderId: {fontSize: 10, color: '#8B0000', fontWeight: 'bold'},
  orderDescription: {fontSize: 16, color: '#8B0000', fontWeight: 'bold'},
  time: {fontSize: 12, color: '#8B0000'},
  deliveryStatus: {fontSize: 14, fontWeight: 'bold', color: '#8B0000'},
  chevron: {marginLeft: 10},
  retryButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#8B0000',
    borderRadius: 5,
  },
  retryText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#8B0000',
    borderRadius: 5,
    alignItems: 'center',
    margin: 16,
  },
  loadMoreText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  footerLoader: {
    marginVertical: 16, // Add margin to the loader
  },
});

export default MyOrdersScreen;
