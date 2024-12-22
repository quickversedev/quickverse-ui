import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeButtons from '../Home/Homebuttons/HomeButtons';
import CategoriesNavigator from './Categories_navigator';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeButtons">
        {/* Main HomeButtons screen */}
        <Stack.Screen
          name="HomeButtons"
          component={HomeButtons}
          options={{headerShown: false, title: 'Home'}}
        />

        {/* Nested navigator for categories */}
        <Stack.Screen
          name="CategoriesNavigator"
          component={CategoriesNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
