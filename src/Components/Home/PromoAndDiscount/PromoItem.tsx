import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {Promo, Vendor} from '../../../utils/canonicalModel';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'Categories'
>;

interface PromoItemProps {
  item: Promo & {vendor?: Vendor};
  bannerWidth: number;
  bannerHeight: number;
}

const PromoItem: React.FC<PromoItemProps> = ({
  item,
  bannerWidth,
  bannerHeight,
}) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCardPress = (vendor: Vendor | undefined) => {
    navigation.removeListener;
    vendor && navigation.navigate('Categories', {vendor});
  };

  return (
    <TouchableOpacity onPress={() => handleCardPress(item?.vendor)}>
      <View style={[styles.imageContainer, {width: bannerWidth}]}>
        <Image
          source={{uri: `${item.promoImage}.jpg`}}
          style={[styles.image, {height: bannerHeight}]}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'red',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default PromoItem;
