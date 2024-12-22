import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FoodScreen from '../Categories/FoodScreen';
import GroceriesScreen from '../Categories/GroceriesScreen';
import ServicesScreen from '../Categories/ServicesScreen';

export type CategoriesStackParamList = {
  FoodScreen: undefined;
  GroceriesScreen: undefined;
  ServicesScreen: undefined;
};

const Stack = createStackNavigator<CategoriesStackParamList>();

const CategoriesNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="FoodScreen">
      <Stack.Screen
        name="FoodScreen"
        component={FoodScreen}
        options={{title: 'Food'}}
      />
      <Stack.Screen
        name="GroceriesScreen"
        component={GroceriesScreen}
        options={{title: 'Groceries'}}
      />
      <Stack.Screen
        name="ServicesScreen"
        component={ServicesScreen}
        options={{title: 'Services'}}
      />
    </Stack.Navigator>
  );
};

export default CategoriesNavigator;
