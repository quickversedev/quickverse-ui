import React from 'react';
import {View, StyleSheet, ScrollView, Modal} from 'react-native';
import theme from '../../theme';
import HorizontalScroll from './HorizontalScroll';
import VendorsList from './HomeScreenVendors';
import AppHeader from '../../utils/AppHeader';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppHeader headerText="Hi, Quick!" />
      <ScrollView>
        <HorizontalScroll />
        <VendorsList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
