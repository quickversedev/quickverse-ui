import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Vendors from './Vendors';
import {Vendor} from '../../utils/canonicalModel';
import Categories from '../Categories/Categories';
import WebViewScreen from '../../utils/WebViewScreen';
import {getCampus} from '../../utils/Storage';
import theme from '../../theme';
import AddressNavigator from '../Cart/cartAddressNavigator';

export type RootStackParamList = {
  VendorList: undefined;
  Categories: {vendor: Vendor};
  WebView: {url: string};
  AddAddress: undefined;
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
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            // height: 60,
          },
          title: getCampus() ? getCampus() : 'Place an Order',
        }}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddressNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default VendorsNavigator;
