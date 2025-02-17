import {
  FlatList,
  View,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Promo} from '../../../utils/canonicalModel';
import PromoItem from './PromoItem';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store';

interface Props {
  promoItemsList: Promo[];
}

const PromoScroll: React.FC<Props> = ({promoItemsList}) => {
  const flatlistRef = useRef<FlatList<Promo>>(null);
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const aspectRatio = 6912 / 3456;
  const bannerHeight = screenWidth / aspectRatio;
  const itemSpacing = 16;
  const bannerWidth = screenWidth - 2 * itemSpacing;

  const vendors = useSelector((state: RootState) => state.vendorList.vendors);

  const promoItemsWithVendor = promoItemsList.map(promo => {
    const vendor = vendors.find(v => v.vendorId === promo.vendorId);
    return {
      ...promo,
      vendor,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === promoItemsWithVendor.length - 1) {
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
        setActiveIndex(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, promoItemsWithVendor.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: bannerWidth + itemSpacing,
    offset: (bannerWidth + itemSpacing) * index,
    index,
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (bannerWidth + itemSpacing));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={promoItemsWithVendor}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={({item}) => (
          <PromoItem
            item={item}
            bannerWidth={bannerWidth}
            bannerHeight={bannerHeight}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        snapToInterval={bannerWidth + itemSpacing}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: itemSpacing}}
        ItemSeparatorComponent={() => <View style={{width: itemSpacing}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});

export default PromoScroll;
