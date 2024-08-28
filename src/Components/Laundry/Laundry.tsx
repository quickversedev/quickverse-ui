import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {mockLaundryItems, LaundryItems} from '../../data/laundry';
// Define types for the shoe item

const LaundryScreen: React.FC = () => {
  const [shoesItems, setShoesItems] = useState<LaundryItems[]>([]);
  const [cart, setCart] = useState<LaundryItems[]>([]);

  useEffect(() => {
    const fetchShoesItems = async () => {
      try {
        const response: LaundryItems[] = await new Promise(resolve => {
          setTimeout(() => {
            resolve(mockLaundryItems);
          }, 1000); // Simulate a network request
        });
        setShoesItems(response);
      } catch (err) {
        Alert.alert('Error', 'Failed to load shoes items.');
      }
    };

    fetchShoesItems();
  }, []);

  const addToCart = (item: LaundryItems) => {
    setCart(prevCart => [...prevCart, item]);
    // Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
    console.log('cart:', cart);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={shoesItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={{uri: item.image}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>INR {item.price}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LaundryScreen;
