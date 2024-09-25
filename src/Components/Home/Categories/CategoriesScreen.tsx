import theme from '../../../theme';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import mockCategoriesData from '../../../data/mockCategoriesData';  
import cardData from '../../../data/mockData'; 
import PlusminusButton from './Plusminusbutton';
import { ScrollView } from 'react-native-gesture-handler';

const Card: React.FC<{ imageUri: string; text: string; price: string; rating: number }> = ({ imageUri, text, price, rating }) => (
  <View style={styles.cardContainer}>
    <View style={[styles.cards, styles.cardElevated]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.descriptionText}>
        <Text style={styles.cardText}>{text}</Text>
        <Text style={styles.priceText}>{price}</Text>
        <Text style={styles.ratingText}>{rating}</Text>
        <PlusminusButton />
      </View>
    </View>
  </View>
);

const CategoriesScreen: React.FC<any> = ({ navigation }) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = () => {
      setCategories(mockCategoriesData.categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category: string) => {
    navigation.navigate('CategoryDetails', { category });
  };

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => handleCategoryPress(item.name)}>
      <Image
        source={{ uri: item.imageURLs[0] }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.container1}>
          <Text style={styles.title}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategoryItem}
            initialNumToRender={10} 
          />
        </View>
        <View style={styles.container2}>
          <View style={styles.cardsContainer}>
            {cardData.map((card, index) => (
              <Card key={index} imageUri={card.imageUri} text={card.text} price={card.price} rating={card.rating} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  container1: {
    padding: 20,
    height: '100%',
    width: '35%',
  },
  container2: {
    width: '65%',
    height: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
    backgroundColor: theme.colors.secondary,
    borderRadius: 100,
    padding: 15,
    textAlign: 'center',
  },
  categoryButton: {
    height: 90,
    width: '100%',
    padding: 5,
    backgroundColor: '#fdda4f',
    marginBottom: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F3C200',
  },
  categoryImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 17,
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  cardsContainer: {},
  cardContainer: {
    width: '48%',
    marginBottom: 20,
    flex: 1,
  },
  cards: {
    width: 250,
    height: 138,
    paddingHorizontal: 5,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: '#F3C200',
    backgroundColor: '#FFDC52',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  descriptionText: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: 80,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    overflow: 'hidden',
    borderRadius: 40, 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    resizeMode: 'cover', 
  },
  ratingText: {
    fontSize: 14,
    color: '#8F1413', 
    fontWeight: '900',
  },
  cardText: {
    fontSize: 15,
    color: '#103E60',
    fontWeight: '900',
    marginTop: 10,
  },
  priceText: {
    fontSize: 20,
    color: '#8F1413',
    fontWeight: '900',
  },
  cardElevated: {
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#EF5354',
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default CategoriesScreen;
