import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const orders = [
  { id: '#999012', date: '20-AUG-2024, 3:25 PM', status: 'Estimated Delivery on 21 AUG', image: 'https://e7.pngegg.com/pngimages/692/99/png-clipart-delicious-food-food-salad-thumbnail.png' },
  { id: '#329012', date: '16-AUG-2024, 3:25 PM', status: 'Delivered on 17 AUG', image: 'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbGlmZW9mcGl4MDAwMDEtaW1hZ2VfMS1renhsdXd3ci5wbmc.png' },
  { id: '#499012', date: '12-AUG-2024, 3:25 PM', status: 'Delivered on 13 AUG', image: 'https://e7.pngegg.com/pngimages/287/494/png-clipart-san-francisco-eatsa-fast-food-restaurant-fast-food-restaurant-healthy-food-leaf-vegetable-food.png' },
  { id: '#439012', date: '10-AUG-2024, 3:25 PM', status: 'Delivered on 11 AUG', image: 'https://w7.pngwing.com/pngs/458/929/png-transparent-hamburger-and-french-fries-fast-food-junk-food-hamburger-french-fries-fried-chicken-fast-food-banner-miscellaneous-food-recipe-thumbnail.png' },
  { id: '#459012', date: '08-AUG-2024, 3:25 PM', status: 'Delivered on 09 AUG', image: 'https://e7.pngegg.com/pngimages/692/99/png-clipart-hamburger-street-food-seafood-fast-food-delicious-food-salmon-with-vegetables-salad-in-plate-leaf-vegetable-food-thumbnail.png' },
  { id: '#769012', date: '06-AUG-2024, 3:25 PM', status: 'Delivered on 07 AUG', image: 'https://e7.pngegg.com/pngimages/535/859/png-clipart-italian-cuisine-pasta-organic-food-restaurant-foods-food-recipe-thumbnail.png' }
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
        <MaterialCommunityIcons 
        name="chevron-right" 
        size={24} 
        color="#A52A2A" 
        />
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
    //paddingHorizontal: 16,
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
    margin:16,
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
});

export default MyOrdersScreen;
