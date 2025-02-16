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
          tabBarActiveTintColor: theme.colors.primary, // Color for focused tab
          tabBarInactiveTintColor: theme.colors.primary, // Color for unfocused tab
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: theme.colors.secondary,
            height: 70,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12, // Font size for labels
            fontWeight: 'bold', // Font weight for labels
            marginBottom: Platform.OS === 'ios' ? 0 : 5, // Margin for labels
          },
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="HomeNavigator"
          component={HomeNavigation}
          options={{
            tabBarLabel: 'Home', // Add title
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'} // Change icon based on focus
                color={color}
                size={focused ? 36 : 26} // Change size based on focus
              />
            ),
          }}
        />

        <Tab.Screen
          name="Vendors"
          component={VendorsNavigator}
          options={{
            tabBarLabel: 'Shops', // Add title
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                name={focused ? 'store' : 'store-outline'} // Change icon based on focus
                color={color}
                size={focused ? 36 : 26} // Change size based on focus
              />
            ),
          }}
        />

        {laundryEnabled && (
          <Tab.Screen
            name="Laundry"
            component={Laundry}
            options={{
              tabBarLabel: 'Laundry', // Add title
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={focused ? 'washing-machine' : 'washing-machine'} // Change icon based on focus
                  color={color}
                  size={focused ? 36 : 26} // Change size based on focus
                />
              ),
            }}
          />
        )}

        {authData && (
          <Tab.Screen
            name="Orders"
            component={OrdersNavigation}
            options={{
              tabBarLabel: 'Orders', // Add title
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={
                    focused ? 'food-takeout-box' : 'food-takeout-box-outline' // Change icon based on focus
                  }
                  color={color}
                  size={focused ? 36 : 26} // Change size based on focus
                />
              ),
            }}
          />
        )}

        {/* {isPharmacyAvailable && (
          <Tab.Screen
            name="Pharmacy"
            component={PharmacyScreen}
            options={{
              tabBarLabel: 'Pharmacy', // Add title
              tabBarIcon: ({ focused, color }) => (
                <MaterialCommunityIcons
                  name={focused ? 'store' : 'store'} // Change icon based on focus
                  color={color}
                  size={focused ? 30 : 26} // Change size based on focus
                />
              ),
            }}
          />
        )} */}

        <Tab.Screen
          name="User Profile"
          component={ProfileNavigation}
          options={{
            tabBarLabel: 'Profile', // Add title
            tabBarIcon: ({focused, color}) => (
              <MaterialCommunityIcons
                name={focused ? 'account-circle' : 'account-circle-outline'} // Change icon based on focus
                color={color}
                size={focused ? 36 : 26} // Change size based on focus
              />
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
};

export default LoggedIn;
