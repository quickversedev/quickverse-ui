import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './userSummaryScreen';
import MyDetails from './MyDetails';
import AboutUs from './AboutUs';
import Help from './Help';
import theme from '../../theme';
import ChangePinScreen from './ChangePin';
import Support from './Feedback';
import AddressScreen from './AddressScreen';
import EditAddressScreen from './Editaddress';
import Help_support from './Help_support';
import Refundstatus from './Refundstatus';

export type RootStackParamList = {
  ProfileScreen: undefined;
  MyDetails:undefined;
  AboutUs: undefined;
  Help: undefined;
  Feedback: undefined;
  ChangePinScreen: undefined;
  AddressScreen: undefined;
  EditAddressScreen: undefined;
  Help_support:undefined;
  Refundstatus:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const ProfileNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Support',
        }}
      />
      <Stack.Screen
        name="MyDetails"
        component={MyDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'MyDetails',
        }}
      />
      <Stack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'EditAddressScreen',
        }}
      />
      <Stack.Screen
        name="Help_support"
        component={Help_support}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Help_support',
        }}
      />
      <Stack.Screen
        name="Refundstatus"
        component={Refundstatus}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Refundstatus',
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
        name="userSummaryScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'userSummaryScreen',
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
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
