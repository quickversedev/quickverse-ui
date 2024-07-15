import {
  FlatList,
  Image,
  View,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Promo} from '../../../utils/canonicalModel';

import theme from '../../../theme';

interface Props {
  promoItemsList: Promo[];
}
const PromoScroll: React.FC<Props> = ({promoItemsList}) => {
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
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, promoItemsList.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const renderItem = ({item}: {item: Promo}) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.image}}
          style={[styles.image, {width: screenWidth, borderRadius: 5}]}
        />
      </View>
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
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Throttle the event to improve performance
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
  },
  image: {
    height: 250,
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
