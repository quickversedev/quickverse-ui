import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type CardProps = {
  imageUri: any;
  text: string;
};

const Card: React.FC<CardProps> = ({ imageUri, text }) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity style={[styles.cards, styles.cardElevated]}>
      <View style={styles.imageContainer}>
      <Image source={{ uri: imageUri }} style={styles.image} />
    <Text style={styles.cardText}>{text}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const cardData = [
  {
    imageUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRreDW9RdU2GTU-Ki1tcVXnE_9QABA-As3AIw&s", 
    text: 'Food',
  },
  {
    imageUri: "https://plus.unsplash.com/premium_photo-1668487826871-2f2cac23ad56?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
    text: 'Pharmacy',
  },
  {
    imageUri: "https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?cs=srgb&dl=pexels-pixabay-534229.jpg&fm=jpg", 
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
