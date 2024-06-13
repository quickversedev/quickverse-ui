import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, FlatList, Dimensions} from 'react-native';
import {Loading} from '../../utils/Loading';
import CardItem from '../util/CardItem';
import {AppDispatch, RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVendorList} from '../../services/VendorListSlice';

const {width} = Dimensions.get('window');
const SPACING: any = 4;
const ITEM_SIZE: any = width * 0.46;
const EMPTY_ITEM_SIZE: any = width - ITEM_SIZE * 2.5;

const HorizontalCardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {vendors, loading} = useSelector(
    (state: RootState) => state.vendorList,
  );
  useEffect(() => {
    dispatch(fetchVendorList());
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={vendors}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.98}
        snapToAlignment="start"
        bounces={false}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          if (!item.image) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }

          return (
            <View style={{width: ITEM_SIZE, margin: SPACING * 3}}>
              <CardItem
                name={item.name}
                distance={item.distance}
                image={item.image}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING * 10,
  },
});

export default HorizontalCardList;
