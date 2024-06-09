import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {SignInScreen} from '../screens/SignInScreen';
import LoginScreen from '../Components/Login/LoginScreen';
import SignupScreen from '../Components/Login/SignUp';
import HomeScreen from '../Components/Home/HomeScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
