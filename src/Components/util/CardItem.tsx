// src/components/CardItem.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
  View,
} from 'react-native';
import {Card} from 'react-native-paper';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');

interface CardItemProps {
  name?: string;
  distance?: string;
  image: ImageSourcePropType;
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
  console.log('name:', image);
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Card.Cover source={image} style={styles.posterImage} />
      <Card.Content style={{alignItems: 'center'}}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
        {/* {distance && (
          <View style={styles.distanceContainer}>
            <MaterialCommunityIcons
              name="timer-outline"
              size={20}
              color={theme.colors.secondary}
              style={styles.icon}
            />
            <Text style={styles.distance} numberOfLines={1}>
              {distance}
            </Text>
          </View>
        )} */}
      </Card.Content>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 1,
    padding: 5,
    alignItems: 'center',
    borderRadius: 15,
  },
  posterImage: {
    width: '90%',
    height: ITEM_SIZE * 0.5,
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.ternary,
    // fontWeight: 'bold',/
  },
  distance: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  icon: {
    marginRight: 5,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardItem;
