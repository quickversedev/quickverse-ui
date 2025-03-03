// import {createStackNavigator} from '@react-navigation/stack';
// import {HomeScreen} from '../screens/HomeScreen';
// import App from '../../App';
// const Stack = createStackNavigator();
import React, { useEffect } from 'react';
import LoggedIn from '../Components/Login/LoggedIn';
import { initializeNotificationService, startForegroundNotificationListener, setBackgroundMessageHandler } from '../utils/notificationUtil.ts';

export const AppStack = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      await initializeNotificationService();
      setBackgroundMessageHandler();
    };

    setupNotifications();
    const unsubscribe = startForegroundNotificationListener();

    return () => unsubscribe();
  }, []);

  return <LoggedIn />;
};
