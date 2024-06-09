import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {HomeScreen} from '../screens/HomeScreen';
// import App from '../../App';
import LoggedIn from '../Components/Login/LoggedIn';

// const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen name="Home Screen" component={LoggedIn} />
    // </Stack.Navigator>
    <LoggedIn />
  );
};
