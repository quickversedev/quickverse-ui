// src/components/CardItem.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
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
const CardItem: React.FC<CardItemProps> = ({name, image, onPress}) => {
  const modifiedUri =
    image && 'uri' in image && image.uri
      ? image.uri.replace('https://imgur.com/', 'https://i.imgur.com/')
      : null;

  return (
    <TouchableOpacity onPress={onPress}>
      {/* <Card.Cover source={image} style={styles.posterImage} />
      <Card.Content style={{alignItems: 'center'}}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
      </Card.Content> */}
      <View style={styles.card}>
        <Image
          source={{uri: modifiedUri}}
          style={{
            width: '100%',
            height: '80%',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            objectFit: 'fill',
            marginBottom: 5,
          }}
        />

        <Text
          style={{
            textAlign: 'center',
            marginBottom: 5,
            color: theme.colors.secondary,
          }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    // marginHorizontal: 1,
    // padding: 5,
    overflow: 'hidden',
    width: ITEM_SIZE * 0.4,
    height: ITEM_SIZE * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: theme.colors.primary,

    // borderEndWidth: 5,
    borderColor: theme.colors.secondary,

    paddingVertical: 10,
    marginVertical: 15,
    marginRight: 12,
    marginLeft: 8,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12,
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
