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
import React, {useEffect, useRef, useState} from 'react';
import {Promo} from '../../../utils/canonicalModel';

import theme from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'WebView'
>;
interface Props {
  promoItemsList: Promo[];
}
const PromoScroll: React.FC<Props> = ({promoItemsList}) => {
  const navigation = useNavigation<HomeNavigationProp>();
  const flatlistRef = useRef<FlatList<Promo>>(null);
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === promoItemsList.length - 1) {
        flatlistRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, promoItemsList.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  const handleCardPress = (url: string | undefined) => {
    navigation.removeListener;
    url && navigation.navigate('WebView', {url});
  };

  const renderItem = ({item}: {item: Promo}) => {
    return (
      <TouchableOpacity onPress={() => handleCardPress(item.promoLink)}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: `${item.promoImage}.jpg`}}
            style={[styles.image, {width: screenWidth, borderRadius: 5}]}
            // resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderDotIndicators = () => {
    return promoItemsList.map((dot, index) => {
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
        pagingEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.dotContainer}>{renderDotIndicators()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    // borderRadius: 25,
  },
  imageContainer: {
    height: 250,
    backgroundColor: 'red',
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
