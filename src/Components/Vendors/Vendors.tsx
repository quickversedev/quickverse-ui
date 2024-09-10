// src/components/HorizontalCardList.tsx
import React from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import AppHeader from '../util/AppHeader';
import VendorCards from './vendorCards';
import theme from '../../theme';
import {Button} from 'react-native-paper';
// import {RootState} from '@reduxjs/toolkit/query';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const {width} = Dimensions.get('window');
const SPACING: number = 4;
const ITEM_SIZE: number = (width - SPACING * 6) / 2;

const Vendors: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <AppHeader headerText="Vendors" />

        <VendorCards />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: 'theme.colors.primary',
  },
  container: {
    backgroundColor: theme.colors.primary,
    paddingBottom: 50,
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

export default Vendors;
