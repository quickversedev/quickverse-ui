import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginNavigator from '../Components/Login/login_navigator';
import HomeScreen from '../Components/Home/HomeScreen';
import Help from '../Components/UserProfile/Help';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginFlow" component={LoginNavigator} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
