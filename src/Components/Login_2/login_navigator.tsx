import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import LoginScreen from './login_2';
import theme from '../../theme';
import {getCampus} from '../../utils/Storage';
import OtpVerificationScreen from './otpVerificationScreen';

export type loginRootStackParamList = {
  LoginScreen1: undefined;
  otpverify: undefined;
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
        component={ OtpVerificationScreen }
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            // height: 60,
          },
          title: getCampus() ? getCampus() : 'Place an Order',
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
