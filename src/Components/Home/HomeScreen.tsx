import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import theme from '../../theme';
import HorizontalScroll from './featuredItems/HorizontalScroll';
import HomeScreenVendors from './homeVendors/HomeScreenVendors';
import AppHeader from '../util/AppHeader';
import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
import CampusBuzz from './campusBuzz/CampusBuzz';
const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppHeader headerText="Hi, Quick!" />
      <ScrollView>
        <HorizontalScroll />
        <HomeScreenVendors />
        <PromoDiscounts />
        <CampusBuzz />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;
