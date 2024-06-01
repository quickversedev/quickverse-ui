/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import theme from './src/theme';
import theme from './src/theme';
// import HomeScreen from './src/Components/HomeScreen';
import HomeScreen from './src/Components/HomeScreen';
import UserProfileScreen from './src/Components/userSummaryScreen';
import OrderSummaryScreen from './src/Components/OrderSummary';
import MapScreen from './src/Components/MapScreen';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            // tabBarIcon: ({size}) => {
            //   let iconName:string;

            //   if (route.name === 'Home') {
            //     iconName = 'home';
            //   } else if (route.name === 'User Profile') {
            //     iconName = 'account';
            //   } else if (route.name === 'Order Summary') {
            //     iconName = 'file-document';
            //   } else if (route.name === 'Map') {
            //     iconName = 'map';
            //   }

            //   return <MaterialCommunityIcons name={iconName} size={size} />;
            // },
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.secondary,

            tabBarStyle: { 
              backgroundColor: theme.colors.primary,
              height: 70, // Increased height of the tab bar
              paddingBottom: 10, // Padding to center the icon
            },
            tabBarLabelStyle: {
              fontSize: 14, // Increased label font size
            },
            tabBarItemStyle: {
              paddingVertical: 5, // Adjust padding for items
            },
            headerShown: false,
          }}>
          <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={26}
            />
          ),
        }}/>
          <Tab.Screen name="User Profile" component={UserProfileScreen} options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              // barStyle={{color: theme.colors.primary}}
              name={focused ? 'account-circle' : 'account-circle-outline'}
              color={color}
              // backgroundColor={theme.colors.primary}
              size={26}
            />
          ),
        }}  />
          <Tab.Screen name="Order Summary" component={OrderSummaryScreen} options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={focused ? 'food-takeout-box' : 'food-takeout-box-outline'}
              color={color}
              size={26}
            />
          ),
        }}/>
          <Tab.Screen name="Map" component={MapScreen} options={{
          tabBarIcon: ({focused, color}) => (
            <MaterialCommunityIcons
              name={
                focused ? 'map-marker-multiple' : 'map-marker-multiple-outline'
              }
              color={color}
              size={26}
            />
          ),
        }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
