import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../theme';
const {width} = Dimensions.get('window');

interface ImageSource {
  uri?: string;
}
interface CardItemProps {
  name?: string;
  distance?: string;
  // image: ImageSourcePropType;
  image?: ImageSource | number;
  onPress: () => void;
}

const ITEM_SIZE: any = width * 0.76;

const CardItem: React.FC<CardItemProps> = ({name, image, onPress}) => {
  // Handle different image source types
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
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={imageSource}
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
    overflow: 'hidden',
    width: ITEM_SIZE * 0.4,
    height: ITEM_SIZE * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: theme.colors.primary,

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
