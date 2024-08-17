import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

const orders = [
  { id: '#999012', date: '20-AUG-2024, 3:25 PM', status: 'Estimated Delivery on 21 AUG', image: 'https://example.com/product1.png' },
  { id: '#329012', date: '16-AUG-2024, 3:25 PM', status: 'Delivered on 17 AUG', image: 'https://example.com/product2.png' },
  { id: '#499012', date: '12-AUG-2024, 3:25 PM', status: 'Delivered on 13 AUG', image: 'https://example.com/product3.png' },
  { id: '#439012', date: '10-AUG-2024, 3:25 PM', status: 'Delivered on 11 AUG', image: 'https://example.com/product4.png' },
  { id: '#459012', date: '08-AUG-2024, 3:25 PM', status: 'Delivered on 09 AUG', image: 'https://example.com/product5.png' },
  { id: '#769012', date: '06-AUG-2024, 3:25 PM', status: 'Delivered on 07 AUG', image: 'https://example.com/product6.png' }
];

const MyOrdersScreen = () => {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.orderDetails}>
        <Text style={styles.orderId}>ORDER : {item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Orders</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDC52',
    paddingHorizontal: 16,
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
    marginVertical: 8,
    alignItems: 'center',
    borderColor: '#FFDC52',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
    width: Dimensions.get('window').width - 32, // Full width with padding
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
  orderDate: {
    color: '#A52A2A',
    marginVertical: 4,
  },
  orderStatus: {
    color: '#0C7C59',
  },
  arrow: {
    fontSize: 18,
    color: '#A52A2A',
  },
});

export default MyOrdersScreen;
