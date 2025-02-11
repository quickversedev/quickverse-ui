import React from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Vendors from './Vendors';
import {Vendor} from '../../utils/canonicalModel';
import Categories from '../Categories/Categories';

export type RootStackParamList = {
  VendorList: undefined;
  Categories: {vendor: Vendor};
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
    </Stack.Navigator>
  );
};

export default VendorsNavigator;
