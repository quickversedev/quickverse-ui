// src/components/HorizontalCardList.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVendorList} from '../../services/VendorListSlice';
import {AppDispatch, RootState} from '../../store/store';
import CardItem from '../util/CardItem';
import {Loading} from '../../utils/Loading';

const {width} = Dimensions.get('window');
const SPACING: number = 4;
const ITEM_SIZE: number = (width - SPACING * 6) / 2;

const VendorCards: React.FC = () => {
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
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {vendors.map(item => (
        <View key={item.id} style={styles.cardContainer}>
          <CardItem
            name={item.name}
            distance={item.distance}
            image={item.image}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: SPACING * 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING,
  },
  cardContainer: {
    width: ITEM_SIZE,
    marginVertical: SPACING,
  },
});

export default VendorCards;
