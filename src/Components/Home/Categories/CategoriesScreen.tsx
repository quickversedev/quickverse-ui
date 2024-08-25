import theme from '../../../theme';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';

interface Category {
  id: string;
  name: string;
  description: string;
  imageURLs: string[];
  type: string;
  parentCategory: string | null;
  countOfSkus: number;
}

interface CategoriesResponse {
  categories: Category[];
  pageCursor: string | null;
}

const mockCategoriesData: CategoriesResponse = {
  categories: [
      {
          id: "92c198b6-e13d-4410-8064-01903524b1b2",
          name: "Other Food and Grocery",
          description: "|",
          imageURLs: [
              "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png"
          ],
          type: "MANAGED",
          parentCategory: null,
          countOfSkus: 1
      },
      {
          id: "276eec3f-d65c-427a-b10d-4b9840056c53",
          name: "Bakery",
          description: "|",
          imageURLs: [
              "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/New_Bakery.png"
          ],
          type: "MANAGED",
          parentCategory: null,
          countOfSkus: 1
      },
      {
          id: "67fb9b78-572e-46e1-a8f2-616312f364ed",
          name: "Instant Food",
          description: "|",
          imageURLs: [
              "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Instant_Food.png"
          ],
          type: "MANAGED",
          parentCategory: null,
          countOfSkus: 8
      },
      {
          id: "6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d",
          name: "Gourmet Food",
          description: "|",
          imageURLs: [
              "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Gourmet_Food.png"
          ],
          type: "MANAGED",
          parentCategory: null,
          countOfSkus: 35
      },
      {
          id: "49735092-3f7f-4a32-a89a-90514826391a",
          name: "Beverages",
          description: "|",
          imageURLs: [
              "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Beverages.png"
          ],
          type: "MANAGED",
          parentCategory: null,
          countOfSkus: 8
      }
  ],
  pageCursor: null
};


const CategoriesScreen: React.FC<any> = ({navigation}) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = () => {
      setCategories(mockCategoriesData.categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category: string) => {
    navigation.navigate('CategoryDetails', {category});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(item.name)}>
            <Image
              source={{uri: item.imageURLs[0]}}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    borderRadius: 100,
    padding: 15,
    alignSelf: 'flex-start', 
    textAlign: 'center',
  },
  categoryButton: {
    padding: 15,
    backgroundColor: theme.colors.primary,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2, // Add a border
    borderColor: '#333', // Set the border color to a blackish tone
    alignSelf: 'flex-start', // Align the component to the left
    marginRight: 'auto',
     width: '100%',
     
   
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 18,
    color:  theme.colors.secondary, 
    fontWeight: 'bold',
    
  },
});

export default CategoriesScreen;
