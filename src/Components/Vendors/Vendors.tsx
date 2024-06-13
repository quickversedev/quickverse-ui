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
import AppHeader from '../../utils/AppHeader';
import {Loading} from '../../utils/Loading';
import VendorCards from './vendorCards';

const {width} = Dimensions.get('window');
const SPACING: number = 4;
const ITEM_SIZE: number = (width - SPACING * 6) / 2;

const HorizontalCardList: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AppHeader headerText="Vendors" />
      <VendorCards />
    </View>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HorizontalCardList;
