// src/components/HorizontalCardList.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
// import CardItem from './CardItem';
import CardItem from './util/CardItem';
// import AppHeader from './AppHeader';
import AppHeader from '../utils/AppHeader';
import venderList from '../data/venderList';

const {width} = Dimensions.get('window');

const SPACING: number = 4;
const ITEM_SIZE: number = (width - SPACING * 6) / 2;

const HorizontalCardList: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AppHeader headerText="Vendors" />
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {venderList.map(item => (
          <View key={item.id} style={styles.cardContainer}>
            <CardItem
              name={item.name}
              distance={item.distance}
              image={item.image}
            />
          </View>
        ))}
      </ScrollView>
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
