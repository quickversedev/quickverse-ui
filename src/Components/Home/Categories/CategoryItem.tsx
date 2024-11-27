import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Define the props for the CategoryItem component
interface CategoryItemProps {
  image: string; // Image is now a URL string
  name: string;
  onPress: () => void; // Callback when item is clicked
}

// Reusable CategoryItem Component
const CategoryItem: React.FC<CategoryItemProps> = ({ image, name, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  itemText: {
    fontSize: 17, // Increase font size
    fontWeight: '600', // Optional: make the text slightly bolder
    textAlign: 'center',
    color: '#8F1413'
  },
});

export default CategoryItem;
