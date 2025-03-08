// import {createStackNavigator} from '@react-navigation/stack';
// import {HomeScreen} from '../screens/HomeScreen';
// import App from '../../App';
// const Stack = createStackNavigator();
import React, {useEffect} from 'react';
import LoggedIn from '../Components/Login/LoggedIn';
import {
  initializeNotificationChannel,
  initializeForegroundMessageHandler,
  initializeBackgroundMessageHandler,
} from '../utils/notificationUtil';

export const AppStack = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      await initializeNotificationChannel();
      const unsubscribe = initializeForegroundMessageHandler();
      initializeBackgroundMessageHandler();

      return () => unsubscribe();
    };

    initializeNotifications();
  }, []);
  return <LoggedIn />;
};
