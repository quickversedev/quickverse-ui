// // import {createStackNavigator} from '@react-navigation/stack';
// // import {HomeScreen} from '../screens/HomeScreen';
// // import App from '../../App';
// // const Stack = createStackNavigator();
// import React, {useEffect} from 'react';
// import LoggedIn from '../Components/Login/LoggedIn';
// import {
//   initializeNotificationChannel,
//   initializeForegroundMessageHandler,
//   initializeBackgroundMessageHandler,
// } from '../utils/notificationUtil';

// export const AppStack = () => {
//   useEffect(() => {
//     const initializeNotifications = async () => {
//       await initializeNotificationChannel();
//       const unsubscribe = initializeForegroundMessageHandler();
//       initializeBackgroundMessageHandler();

//       return () => unsubscribe();
//     };

//     initializeNotifications();
//   }, []);
//   return <LoggedIn />;
// };
import React, {useEffect, useState} from 'react';
import LoggedIn from '../Components/Login/LoggedIn';
import {
  initializeNotificationChannel,
  initializeForegroundMessageHandler,
  initializeBackgroundMessageHandler,
  checkNotificationPermissions,
  requestNotificationPermissions,
} from '../utils/notificationUtil';
import {View, Text, ActivityIndicator, Platform} from 'react-native';

export const AppStack = () => {
  const [hasNotificationPermission, setHasNotificationPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Initialize notification channel (Android)
        await initializeNotificationChannel();

        // Check or request permissions
        if (Platform.OS === 'ios') {
          const hasPermission = await checkNotificationPermissions();
          if (!hasPermission) {
            await requestNotificationPermissions();
          }
          setHasNotificationPermission(true); // Proceed regardless of permission decision
        } else {
          // For Android, we proceed after initializing the channel
          setHasNotificationPermission(true);
        }

        // Set up message handlers
        const unsubscribe = initializeForegroundMessageHandler();
        initializeBackgroundMessageHandler();

        return () => unsubscribe();
      } catch (error) {
        console.error('Notification initialization error:', error);
        setHasNotificationPermission(true); // Still proceed to app even if notifications fail
      }
    };

    initializeNotifications();
  }, []);
  // console.log('hasNotificationPermission:', hasNotificationPermission);
  // Show loading indicator while checking permissions
  if (hasNotificationPermission === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 10}}>Checking notifications...</Text>
      </View>
    );
  }

  // Render the app once we have permission status (whether granted or not)
  return <LoggedIn />;
};
