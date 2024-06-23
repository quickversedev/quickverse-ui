import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WebViewScreen from '../../utils/WebViewScreen';
import theme from '../../theme';
// import {useAuth} from '../utils/AuthContext';
import {useAuth} from '../../utils/AuthContext';

export type RootStackParamListHome = {
  HomeScreen: undefined;
  WebView: {url: string};
};

const Stack = createStackNavigator<RootStackParamListHome>();

const HomeNavigation: React.FC = () => {
  const {authData} = useAuth();
  console.log('authdata.campus:', authData?.campus);
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
          title: authData?.campus,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
