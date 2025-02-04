/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import VendorsNavigator from '../Vendors/VendorsNavigator';
import HomeNavigation from '../Home/HomeNavigation';
import ProfileNavigation from '../UserProfile/profileNavigation';
import {Platform} from 'react-native';
import Laundry from '../Laundry/Laundry';
import {useAuth} from '../../utils/AuthContext';
import OrdersNavigation from '../Orders/OrdersNavigator';
// import PharmacyScreen from '../pharmacy/Pharmacy';
const Tab = createBottomTabNavigator();

const LoggedIn: React.FC = () => {
  const {configs, authData} = useAuth();
  const laundryEnabled = configs?.configuration?.isLaundryEnabled;
  // const isPharmacyAvailable = configs?.configuration?.isLaundryEnabled;
  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.secondary,
          tabBarInactiveTintColor: theme.colors.secondary,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.primary,
            height: Platform.OS === 'ios' ? 80 : 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
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
        {true && (
          <Tab.Screen
            name="Laundry"
            component={Laundry}
            options={{
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={focused ? 'washing-machine' : 'washing-machine'}
                  color={color}
                  size={focused ? 36 : 26}
                />
              ),
            }}
          />
        )}
        {true ? (
          <Tab.Screen
            name="Orders"
            component={OrdersNavigation}
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
              tabBarLabel: 'Orders',
            }}
          />
        ) : (
          <></>
        )}
        {/* {isPharmacyAvailable && (
          <Tab.Screen
            name="Pharmacy"
            component={PharmacyScreen}
            options={{
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={focused ? 'store' : 'store'}
                  color={color}
                  size={focused ? 36 : 26}
                />
              ),
            }}
          />
        )} */}
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
