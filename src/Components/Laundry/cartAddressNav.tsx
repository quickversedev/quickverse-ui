import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
/// Adjust path as needed
import React from 'react';
import Laundry from './Laundry';
import AddressPage from './Address/AddressPage';

export type RootStackParamList = {
  LaundryStack: undefined;
  CartModal: undefined;
  AddressPage: undefined;
};

export type CartModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CartModal'
>;
export type AddressPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddressPage'
>;

const Stack = createStackNavigator<RootStackParamList>();

const CartAddressNav: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LaundryStack"
      // Customize this asLaundryStack needed
    >
      <Stack.Screen name="LaundryStack" component={Laundry} />
      {/* <Stack.Screen name="CartModal" component={CartModal} /> */}
      <Stack.Screen name="AddressPage" component={AddressPage} />
    </Stack.Navigator>
  );
};

export default CartAddressNav;
