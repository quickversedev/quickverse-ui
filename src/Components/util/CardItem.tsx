// src/components/CardItem.tsx
import React from 'react';
import {StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
const {width} = Dimensions.get('window');

interface CardItemProps {
  name: string;
  distance: string;
  image: string;
  onPress: () => void;
}
const ITEM_SIZE: any = width * 0.76;
const SPACING: any = 4;
const CardItem: React.FC<CardItemProps> = ({
  name,
  distance,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Card.Cover source={image} style={styles.posterImage} />
      <Card.Content style={{alignItems: 'center'}}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.distance} numberOfLines={1}>
          {distance}
        </Text>
      </Card.Content>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 0.8,
    resizeMode: 'cover',
    borderRadius: 24,

    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  distance: {
    fontSize: 14,
  },
});

export default CardItem;
