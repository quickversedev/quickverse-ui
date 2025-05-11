import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WebViewScreen from '../../utils/WebViewScreen';
import theme from '../../theme';
import {getCampus} from '../../utils/Storage';
import {Vendor} from '../../utils/canonicalModel';
import Categories from '../Categories/Categories';

export type RootStackParamListHome = {
  HomeScreen: undefined;
  WebView: {url: string};
  Categories: {vendor: Vendor};
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
        name="Categories"
        component={Categories}
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
