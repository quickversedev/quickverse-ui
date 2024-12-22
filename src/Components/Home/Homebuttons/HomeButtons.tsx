import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import theme from '../../../theme';

type HomeButtonsNavigationProp = StackNavigationProp<
  any,
  'CategoriesNavigator'
>;

const HomeButtons: React.FC = () => {
  const navigation = useNavigation<HomeButtonsNavigationProp>();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('CategoriesNavigator', {screen: 'FoodScreen'})
        }>
        <Image
          source={require('../../../data/images/burger.jpg')}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>FOOD</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('CategoriesNavigator', {
            screen: 'GroceriesScreen',
          })
        }>
        <Image
          source={require('../../../data/images/groceries.jpg')}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>GROCERIES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('CategoriesNavigator', {screen: 'ServicesScreen'})
        }>
        <Image
          source={require('../../../data/images/services.jpg')}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>SERVICES</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: '2%',
  },
  button: {
    flex: 1,
    maxWidth: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.button,
    borderRadius: 20,
    marginHorizontal: '2%',
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonImage: {
    width: '60%',
    height: '60%',
    borderRadius: 9999,
    resizeMode: 'cover',
    borderWidth: 1,
  },
  buttonText: {
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.secondary,
  },
});

export default HomeButtons;
