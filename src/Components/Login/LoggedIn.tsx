/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import UserProfileScreen from '../UserProfile/userSummaryScreen';
import OrderDetailsScreen from '../OrderSummary';
import globalConfig from '../../utils/GlobalConfig';
import VendorsNavigator from '../Vendors/VendorsNavigator';
import HomeNavigation from '../Home/HomeNavigation';
import ProfileNavigation from '../UserProfile/profileNavigation';
const Tab = createBottomTabNavigator();

const LoggedIn: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.secondary,
          tabBarInactiveTintColor: theme.colors.secondary,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },

          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeNavigator"
          component={HomeNavigation}
          options={{
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={focused ? 36 : 26}
              />
            ),
          }}
        />
        {globalConfig.OrderSummeryEnabled ? (
          <Tab.Screen
            name="Order Summary"
            component={OrderDetailsScreen}
            options={{
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={
                    focused ? 'food-takeout-box' : 'food-takeout-box-outline'
                  }
                  color={color}
                  size={focused ? 36 : 26}
                />
              ),
            }}
          />
        ) : (
          <></>
        )}
        <Tab.Screen
          name="Vendors"
          component={VendorsNavigator}
          options={{
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                name={focused ? 'store' : 'store-outline'}
                color={color}
                size={focused ? 36 : 26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="User Profile"
          component={ProfileNavigation}
          options={{
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                name={focused ? 'account-circle' : 'account-circle-outline'}
                color={color}
                size={focused ? 36 : 26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
};

export default LoggedIn;
