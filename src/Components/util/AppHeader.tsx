// src/components/AppHeader.tsx
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';

const {width} = Dimensions.get('window');

interface AppHeaderProps {
  headerText: string;
  subHeaderText?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({headerText, subHeaderText}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{headerText}</Text>
      {subHeaderText && (
        <Text style={styles.subHeaderText}>{subHeaderText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    padding: 15,
    backgroundColor: theme.colors.primary,
    // marginBottom: 10,
    shadowColor: theme.colors.ternary,
    shadowOffset: {
      width: 0,
      height: 20, // This will add a shadow at the bottom
    },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 2,
  },
  headerText: {
    fontSize: 24,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default AppHeader;
