import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from './userSummaryScreen';
import AboutUs from './AboutUs';
import Help from './Help';
import Feedback from './Feedback';
import theme from '../../theme';
import ChangePinScreen from './ChangePin';
import Address from './Address';

export type RootStackParamList = {
  ProfileScreen: undefined;
  AboutUs: undefined;
  Help: undefined;
  Feedback: undefined;
  ChangePinScreen: undefined;
  Address: undefined;
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
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'About Us',
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
      <Stack.Screen
        name="ChangePinScreen"
        component={ChangePinScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Change Pin',
        }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Saved Addresses',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
