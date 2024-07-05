// src/components/HorizontalCardList.tsx
import React from 'react';
import {View, StyleSheet, StatusBar, Dimensions} from 'react-native';
import AppHeader from '../util/AppHeader';
import VendorCards from './vendorCards';
import theme from '../../theme';

const {width} = Dimensions.get('window');
const SPACING: number = 4;
const ITEM_SIZE: number = (width - SPACING * 6) / 2;

const Vendors: React.FC = () => {
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
    backgroundColor: theme.colors.primary,
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
