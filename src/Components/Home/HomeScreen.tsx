import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import theme from '../../theme';
import HorizontalScroll from './HorizontalScroll';
import HomeScreenVendors from './HomeScreenVendors';
import AppHeader from '../util/AppHeader';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppHeader headerText="Hi, Quick!" />
      <ScrollView>
        <HorizontalScroll />
        <HomeScreenVendors />
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
