import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

//images
import food from './assets/Food.png';
import Pharmacy from './assets/Pharmacy.png';
import services from './assets/Services.png';

type CardProps = {
  imageUri: any;
  text: string;
};

const Card: React.FC<CardProps> = ({ imageUri, text }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity style={[styles.cards, styles.cardElevated]}>
      <View style={styles.imageContainer}>
        <Image source={imageUri} style={styles.image} />
    <Text style={styles.cardText}>{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const cardData = [
  {
    imageUri: food, 
    text: 'Food',
  },
  {
    imageUri: Pharmacy,
    text: 'Pharmacy',
  },
  {
    imageUri: services, 
    text: 'Services',
  },
];

export default function Categories() {
  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        {cardData.map((card, index) => (
          <Card key={index} imageUri={card.imageUri} text={card.text} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    color: 'black',
  },
  categories: {
    flexDirection: 'row',
    padding: 5,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  cards: {
    width: 120,
    height: 120,
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 15,
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
});
