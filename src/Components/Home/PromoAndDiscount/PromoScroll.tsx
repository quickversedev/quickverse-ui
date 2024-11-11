import {
  FlatList,
  Image,
  View,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Promo } from '../../../utils/canonicalModel';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListHome } from '../HomeNavigation';

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'WebView'
>;
interface Props {
  promoItemsList: Promo[];
}
const PromoScroll: React.FC<Props> = ({ promoItemsList }) => {
  const navigation = useNavigation<HomeNavigationProp>();
  const flatlistRef = useRef<FlatList<Promo>>(null);
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const aspectRatio = 6912 / 3456;
  const bannerHeight = screenWidth / aspectRatio;

  // Adjusted padding between banners
  const itemSpacing = 16;
  const bannerWidth = screenWidth - 2 * itemSpacing;


  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === promoItemsList.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
        setActiveIndex(0);
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
        setActiveIndex((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, promoItemsList.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: bannerWidth + itemSpacing,
    offset: (bannerWidth + itemSpacing) * index,
    index,
  });
  const handleCardPress = (url: string | undefined) => {
    navigation.removeListener;
    url && navigation.navigate('WebView', { url });
  };

  const renderItem = ({ item }: { item: Promo }) => {
    return (
      <TouchableOpacity onPress={() => handleCardPress(item.promoLink)}>
        <View style={[styles.imageContainer, { width: bannerWidth }]}>
          <Image
            // source={{ uri: `${item.promoImage}.jpg` }}
            source={require('../../../data/images/3.png')}
            style={[styles.image, { height: bannerHeight }]}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (bannerWidth + itemSpacing));
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return promoItemsList.map((_, index) => {
      return (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                activeIndex === index
                  ? theme.colors.secondary
                  : theme.colors.ternary,
            },
          ]}
        />
      );
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={promoItemsList}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        horizontal={true}
        snapToInterval={bannerWidth + itemSpacing}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: itemSpacing }}
        ItemSeparatorComponent={() => <View style={{ width: itemSpacing }} />}

      />

      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,

  },
  imageContainer: {
    backgroundColor: 'red',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default PromoScroll;
