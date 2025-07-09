
import React, { useEffect } from 'react';
import LoggedIn from '../Components/Login/LoggedIn';
import { useNotification } from '../utils/Hooks/useNotification';
import { useFCMTokenHandler } from '../utils/Hooks/useFCMTokenHandler';

export const AppStack = () => {
  const {
    initializeNotifications,
    onNotificationPress,
    onBackgroundNotificationPress,
  } = useNotification();

  const { refreshFCMToken } = useFCMTokenHandler();

  useEffect(() => {
    // Initialize notifications when the app starts
    initializeNotifications().catch(error => {
      console.error('Failed to initialize notifications:', error);
    });

    // Set up notification press handlers
    const foregroundUnsubscribe = onNotificationPress((notification) => {
      console.log('Notification pressed:', notification);
      // Handle notification press - you can navigate to specific screens here
      // Example: navigation.navigate('OrderDetails', { orderId: notification.data?.orderId });
    });

    onBackgroundNotificationPress((notification) => {
      console.log('Background notification pressed:', notification);
      // Handle background notification press
    });

    // Cleanup on unmount
    return () => {
      if (typeof foregroundUnsubscribe === 'function') {
        foregroundUnsubscribe();
      }
    };
  }, [initializeNotifications, onNotificationPress, onBackgroundNotificationPress]);

  return <LoggedIn />;
};
