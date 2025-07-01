import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddAddressScreen from '../UserProfile/AddAddressScreen';
import AddAddressScreen2 from '../UserProfile/AddAddressScreen2';

export type AddressStackParamList = {
  AddAddressScreen: undefined;
  AddAddressScreen2: {
    latitude: number;
    longitude: number;
  };
};

const Stack = createStackNavigator<AddressStackParamList>();

const AddressNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddAddressScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
      <Stack.Screen name="AddAddressScreen2" component={AddAddressScreen2} />
    </Stack.Navigator>
  );
};

export default AddressNavigator;
