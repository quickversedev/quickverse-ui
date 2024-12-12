import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Login/LoginScreen';
import OtpVerificationScreen from './otpVerificationScreen';

export type loginRootStackParamList = {
  LoginScreen1: undefined;
  otpverify: {phoneNumber: string; verificationId: string};
};

const Stack = createStackNavigator<loginRootStackParamList>();

const LoginNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen1">
      <Stack.Screen
        name="LoginScreen1"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="otpverify"
        component={OtpVerificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
