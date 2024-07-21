import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import theme from '../../theme';
import HomeScreenVendors from './homeVendors/HomeScreenVendors';
import AppHeader from '../util/AppHeader';
import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
import CampusBuzz from './campusBuzz/CampusBuzz';
import {useAuth} from '../../utils/AuthContext';
import FeaturedItems from './featuredItems/FeaturedItems';
const HomeScreen: React.FC = () => {
  const {authData} = useAuth();
  const name = authData?.session.name;
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader headerText={authData ? 'Hi, ' + name : 'Hi, Welcome...!'} />
      <ScrollView>
        <FeaturedItems />
        <HomeScreenVendors />
        <PromoDiscounts />
        <CampusBuzz />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;
