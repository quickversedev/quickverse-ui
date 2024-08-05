import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//import HomeScreen from './HomeScreen';
import WebViewScreen from '../../utils/WebViewScreen';
import theme from '../../theme';
import {getCampus} from '../../utils/Storage';
import HomeScreen from './HomeScreen';

export type RootStackParamListHome = {
  HomeScreen: undefined;
  WebView: {url: string};
};

const Stack = createStackNavigator<RootStackParamListHome>();

const HomeNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          title: getCampus(),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
