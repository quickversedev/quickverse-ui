import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

// Define the props for the CategoryItem component
interface CategoryItemProps {
  image: string | null; // Image can be a string URL or null
  name: string;
}

// Reusable CategoryItem Component
const CategoryItem: React.FC<CategoryItemProps> = ({ image, name }) => {
  return (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        {/* You can replace this with an actual image */}
        <View style={styles.image} />
      </View>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );
};

export default function CategoriesPage() {
  // Define item data with proper typing
  const items: { id: string; name: string }[] = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
    { id: '5', name: 'Item 5' },
    { id: '6', name: 'Item 6' },
  ];

  return (
    <View style={styles.main}>
      {/* Food Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Food</Text>
        <FlatList
          data={items}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem image={null} name={item.name} />
          )}
        />
      </View>

      {/* Pharmacy Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Pharmacy</Text>
        <FlatList
          data={items}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem image={null} name={item.name} />
          )}
        />
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.heading}>Services</Text>
        <FlatList
          data={items}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem image={null} name={item.name} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFDC52',
  },
  section: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginBottom: 5,
  },
  image: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#ccc', // Placeholder background color for the image
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
