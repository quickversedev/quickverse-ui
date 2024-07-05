import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Vendors from './Vendors';
import WebViewScreen from '../../utils/WebViewScreen';
import theme from '../../theme';
import {getCampus} from '../../utils/Storage';

export type RootStackParamList = {
  VendorList: undefined;
  WebView: {url: string};
  navigation?: StackNavigationProp<any, any>;
};

const Stack = createStackNavigator<RootStackParamList>();

const VendorsNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="VendorList">
      <Stack.Screen
        name="VendorList"
        component={Vendors}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          title: getCampus() ? getCampus() : 'Place an Order',
        }}
      />
    </Stack.Navigator>
  );
};

export default VendorsNavigator;
