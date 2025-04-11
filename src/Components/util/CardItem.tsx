import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import theme from '../../theme';
const {width} = Dimensions.get('window');

interface ImageSource {
  uri?: string;
}
interface CardItemProps {
  name?: string;
  distance?: string;
  image?: ImageSource;
  onPress: () => void;
}

const ITEM_SIZE = width * 0.76;

const CardItem: React.FC<CardItemProps> = ({name, image, onPress}) => {
  const imageSource = React.useMemo(() => {
    if (image && typeof image === 'object' && 'uri' in image) {
      const modifiedUri = (image.uri as string)?.replace(
        'https://imgur.com/',
        'https://i.imgur.com/',
      );
      return modifiedUri ? {uri: modifiedUri} : undefined;
    }
    return image;
  }, [image]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: ITEM_SIZE * 0.4,
    height: ITEM_SIZE * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.secondary,
    marginTop: 10,
    marginBottom: 22,
    marginRight: 12,
    marginLeft: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  image: {
    width: '100%',
    height: '70%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 5,
    ...Platform.select({
      ios: {
        resizeMode: 'cover', // Better for iOS performance
      },
      android: {
        objectFit: 'fill',
      },
    }),
  },
  nameText: {
    textAlign: 'center',
    // marginBottom: 5,
    color: theme.colors.secondary,
    ...Platform.select({
      ios: {
        fontSize: 15,
        fontWeight: '500', // Medium weight works better on iOS
        fontFamily: 'System', // Default iOS font
      },
      android: {
        fontSize: 14,
      },
    }),
  },
  // Additional styles kept for reference
  posterImage: {
    width: '90%',
    height: ITEM_SIZE * 0.5,
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 10,
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
