import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Promo, Vendor} from '../../../utils/canonicalModel';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'Categories'
>;

interface Props {
  promoItemsList: Promo[];
}

const {width: screenWidth} = Dimensions.get('window');

const PromoScroll: React.FC<Props> = ({promoItemsList}) => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const aspectRatio = 6000 / 3456;
  const bannerHeight = screenWidth / aspectRatio;

  const vendors = useSelector((state: RootState) => state.vendorList.vendors);

  // Attach vendor data to promo items
  const promoItemsWithVendor = promoItemsList.map(promo => ({
    ...promo,
    vendor: vendors.find(v => v.vendorId === promo.vendorId),
  }));

  const handleCardPress = (vendor: Vendor | undefined) => {
    navigation.removeListener;
    vendor && navigation.navigate('Categories', {vendor});
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={5000}
        width={screenWidth}
        height={bannerHeight}
        data={promoItemsWithVendor}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleCardPress(item?.vendor)}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: `${item.promoImage}.jpg`}}
                style={[styles.image, {height: bannerHeight}]}
                resizeMode="cover"
                onError={() =>
                  console.log('Image failed to load:', item.promoImage)
                }
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PromoScroll;
