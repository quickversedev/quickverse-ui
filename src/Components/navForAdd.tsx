import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import HomeScreen from './Home/HomeScreen.1';
import ProfileScreen from './UserProfile/userSummaryScreen';
import HomeScreen from './Home/HomeScreen';
 //import HomeScreen from './screens/HomeScreen';
// import ProfileScreen from './screens/ProfileScreen'; // Create this screen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
