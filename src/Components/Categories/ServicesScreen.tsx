import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import styles from './C_styles';

const serviceItems = [
  {name: 'Laundry', image: 'https://via.placeholder.com/150'},
  {name: 'Bike Rentals', image: 'https://via.placeholder.com/150'},
  {name: 'Pharmacy', image: 'https://via.placeholder.com/150'},
  {name: 'Drone', image: 'https://via.placeholder.com/150'},
  {name: 'Abc', image: 'https://via.placeholder.com/150'},
  {name: 'Abc', image: 'https://via.placeholder.com/150'},
];

const ServicesScreen = () => {
  const renderItem = ({item}: {item: any}) => (
    <View style={styles.category}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Services</Text>
      <FlatList
        data={serviceItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default ServicesScreen;
