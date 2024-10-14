import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../../../theme';
import mockCategoriesData from '../../../data/mockCategoriesData';  
import cardData from '../../../data/mockData'; 
import PlusminusButton from './Plusminusbutton';
import { ScrollView } from 'react-native-gesture-handler';
import lineImage from '../../../data/images/line.png'

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
      <Text 
        style={styles.categoryText} 
        numberOfLines={2} 
        adjustsFontSizeToFit 
        minimumFontScale={0.5} 
      >
        {item.name}
      </Text>
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
    flex:1
  },
  title: {
    width: 100, 
    height: 50, 
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
    height: 100,
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
    width: 60,
    height: 50,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center', 
    textAlignVertical: 'center',
    flexWrap: 'wrap',
    width: '100%',  
    paddingHorizontal: 5, 
  },
  cardsContainer: {},
  cardContainer: {
    width: '48%',
    marginBottom: 10,
    flex: 1,
  },
  cards: {
    width: 250,
    height: 108,
    paddingHorizontal: 5,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: '#F3C200',
    backgroundColor: '#FFDF63',
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
    paddingLeft: 2,
    overflow: 'hidden',
    borderRadius: 40, 
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35, 
    resizeMode: 'cover', 
  },
  ratingText: {
    fontSize: 14,
    color: '#8F1413', 
    fontWeight: '900',
  },
  cardText: {
    fontSize: 14,
    color: '#103E60',
    fontWeight: '900',
    marginTop: 5,
  },
  priceText: {
    fontSize: 18,
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
});

export default CategoriesScreen;
