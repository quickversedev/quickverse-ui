/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import HomeScreen from '../Home/HomeScreen';
import UserProfileScreen from '../userSummaryScreen';
import OrderDetailsScreen from '../OrderSummary';
import Vandors from '../Vendors/Vendors';
import globalConfig from '../../utils/GlobalConfig';
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
            height: 70, // Increased height of the tab bar
          },

          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
          component={Vandors}
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
          component={UserProfileScreen}
          options={{
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                // barStyle={{color: theme.colors.primary}}
                name={focused ? 'account-circle' : 'account-circle-outline'}
                color={color}
                // backgroundColor={theme.colors.primary}
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
