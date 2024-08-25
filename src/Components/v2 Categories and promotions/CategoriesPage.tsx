import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import PlusminusButton from './Plusminusbutton'

// images
import food from './assets/Food.png';
import Pharmacy from './assets/Pharmacy.png';
import services from './assets/Services.png';

type CardProps = {
  imageUri: any;
  text: string;
  price: string;
};

const Card: React.FC<CardProps> = ({ imageUri, text, price }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity style={[styles.cards, styles.cardElevated]}>
      <View style={styles.imageContainer}>
        <Image source={imageUri} style={styles.image} />
        <Text style={styles.cardText}>{text}</Text>
        <Text style={styles.priceText}>{price}</Text>
        <View style={styles.buttonContainer}>
          <PlusminusButton />
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const cardData = [
  {
    imageUri: food, 
    text: 'pizza',
    price: '120'
  },
  {
    imageUri: food, 
    text: 'pizza',
    price: '120'
  },
  {
    imageUri: food, 
    text: 'pizza',
    price: '120'
  },
  {
    imageUri: food, 
    text: 'pizza',
    price: '120'
  },
  {
    imageUri: food, 
    text: 'pizza',
    price: '120'
  },
  {
    imageUri: food, 
    text: 'pizza',
    price: '120'
  },
];

export default function Cards() {
  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        {cardData.map((card, index) => (
          <Card key={index} imageUri={card.imageUri} text={card.text} price={card.price} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    paddingHorizontal: 20, 
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    color: 'black',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%', 
    marginBottom: 20,
  },
  cards: {
    width: '100%',
    height: 200,
    borderRadius: 32, 
    overflow: 'hidden', 
    borderWidth: 1.5, 
    borderColor: '#8F1413',
    backgroundColor: '#FFDC52', 
    justifyContent: 'center',    
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,   
    height: 80,  
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#103E60',
    fontWeight: '900',
    paddingTop: 4,
  },
  priceText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#8F1413',
    fontWeight: '900',
    paddingTop: 4,
  },
  cardElevated: {
    elevation: 4,
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
