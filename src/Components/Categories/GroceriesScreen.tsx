import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import styles from './C_styles'; // Import the shared styles

const groceryItems = [
  {name: 'Abc', image: 'https://via.placeholder.com/150'},
  {name: 'Abc', image: 'https://via.placeholder.com/150'},
  {name: 'Abv', image: 'https://via.placeholder.com/150'},
  {name: 'Abc', image: 'https://via.placeholder.com/150'},
  {name: 'Abc', image: 'https://via.placeholder.com/150'},
  {name: 'Abc', image: 'https://via.placeholder.com/150'},
];

const GroceriesScreen = () => {
  const renderItem = ({item}: {item: any}) => (
    <View style={styles.category}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Groceries</Text>
      <FlatList
        data={groceryItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default GroceriesScreen;
