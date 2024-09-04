// src/components/AppHeader.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Button,
} from 'react-native';
import theme from '../../theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

const {width} = Dimensions.get('window');

interface AppHeaderProps {
  headerText: string;
  subHeaderText?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({headerText, subHeaderText}) => {
  // const cart = useSelector((state: RootState) => state.cart.cart);
  // const handlePress = () => {
  //   console.log('pressing Button', cart);
  // };
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
    paddingBottom: 15,
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.ternary,
    shadowOffset: {
      width: 0,
      height: 2, // This will add a shadow at the bottom
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerText: {
    fontSize: 24,
    color: theme.colors.ternary,
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
