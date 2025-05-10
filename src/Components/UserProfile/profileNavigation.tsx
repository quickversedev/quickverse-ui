import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './userSummaryScreen';

import AboutUs from './AboutUs';
import Help from './Help';
import Feedback from './Feedback';
import theme from '../../theme';
import AddressScreen from './AddressScreen';
import AddAddressScreen from './AddAddressScreen';

export type RootStackParamList = {
  ProfileScreen: undefined;
  AboutUs: undefined;
  Help: undefined;
  Feedback: undefined;
  ChangePinScreen: undefined;
  AddressScreen: undefined;
  AddAddressScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const ProfileNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Feedback',
        }}
      />

      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'AddressScreen',
        }}
      />

      <Stack.Screen
        name="AddAddressScreen"
        component={AddAddressScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'AddAddressScreen',
        }}
      />

      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'AboutUs..!',
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Help',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
