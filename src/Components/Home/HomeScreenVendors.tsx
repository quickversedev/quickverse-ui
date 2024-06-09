// src/components/Heading.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import HorizontalCardList from './HorizontalCardList';

const VendorsList = () => {
  return (
    <View style={styles.headingContainer}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text variant="titleLarge" style={styles.heading}>
          Stores Near You!
        </Text>
        <View style={styles.line} />
      </View>
      <HorizontalCardList />
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 2, // Thicker line
    backgroundColor: '#333',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default VendorsList;
