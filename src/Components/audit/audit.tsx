import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {fetchVendorList} from '../../services/VendorListSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {Vendor} from '../../utils/canonicalModel';
import mockOrdersResponse from '../../data/myOrders';

const Audit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [vendorss, setVendorss] = useState<any>([]);
  //   const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {vendors, loading} = useSelector(
    (state: RootState) => state.vendorList,
  );
  // Fetch vendor IDs
  const fetchOrdersForVendors = async () => {
    try {
      const updatedVendors = await Promise.all(
        vendors.map(async vendor => {
          // Fetch orders for the current vendor
          const response = await new Promise<any>(resolve => {
            // Simulate network delay with setTimeout
            setTimeout(() => {
              resolve(mockOrdersResponse);
            }, 1000); // 1 second delay
          });

          // Extract ordersMetadata from the response
          const ordersMetadata = response.ordersMetadata;
          console.log('ordersMetadata', response);
          // Calculate the number of pending orders
          const pendingOrders = ordersMetadata.filter(
            order => order.state === 'PENDING',
          ).length;

          // Return the updated vendor object with the pendingOrders count
          return {...vendor, pendingOrders};
        }),
      );

      // Update the vendors state with the new data
      setVendorss(updatedVendors);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    dispatch(fetchVendorList('IIMU'));
    if (!loading) {
      fetchOrdersForVendors();
    }
  }, [dispatch]);

  // Fetch orders for each vendor

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchOrdersForVendors();
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  console.log('vendors', vendorss);
  return (
    <View style={styles.container}>
      <FlatList
        data={vendorss}
        keyExtractor={item => item?.vendorId}
        renderItem={({item}) => (
          <View style={styles.vendorItem}>
            <Text style={styles.vendorName}>{item.vendorId}</Text>
            <Text style={styles.pendingOrders}>
              Pending Orders: {item.pendingOrders}
            </Text>
          </View>
        )}
      />
      <Button title="Refresh" onPress={handleRefresh} disabled={refreshing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  vendorItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pendingOrders: {
    fontSize: 16,
    color: '#666',
  },
});

export default Audit;
