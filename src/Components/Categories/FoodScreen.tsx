import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, ActivityIndicator} from 'react-native';
import axios from 'axios';
import styles from './C_styles';

type FoodItem = {
  name: string;
  image: string;
};

const FoodScreen = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          'http://65.0.18.159:8080/quickVerse/v1/campus/IIMU-313001/vendors',
          {
            headers: {
              Authorization: 'Basic cXZDYXN0bGVFbnRyeTpjYSR0bGVfUGVybWl0QDAx',
            },
          },
        );
        const formattedData = response.data.map((vendor: any) => ({
          name: vendor.vendorName,
          image: vendor.vendorBanner,
        }));
        setFoodItems(formattedData);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const renderItem = ({item}: {item: FoodItem}) => (
    <View style={styles.category}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Food</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={foodItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      )}
    </View>
  );
};

export default FoodScreen;
