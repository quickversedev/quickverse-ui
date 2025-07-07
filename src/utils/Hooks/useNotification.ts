import {useEffect, useRef, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {
  getFCMToken,
  createNotificationChannels,
  displayForegroundNotification,
  displayCustomNotification,
  requestNotificationPermissions,
  checkNotificationPermissions,
  onNotificationPress,
  onBackgroundNotificationPress,
  shouldHandleInForeground,
  shouldHandleInBackground,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_TYPES,
} from '../notificationUtil';

interface NotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
  channelId?: string;
  sound?: string;
  icon?: string;
  color?: string;
  bigText?: string;
}

interface UseNotificationReturn {
  isInitialized: boolean;
  hasPermission: boolean;
  fcmToken: string | null;
  getToken: () => Promise<string>;
  initializeNotifications: () => Promise<void>;
  requestPermissions: () => Promise<boolean>;
  displayNotification: (notification: NotificationData) => Promise<string>;
  displayCustomNotification: (notification: NotificationData) => Promise<string>;
  onNotificationPress: (callback: (notification: any) => void) => (() => void) | void;
  onBackgroundNotificationPress: (callback: (notification: any) => void) => void;
}

export const useNotification = (): UseNotificationReturn => {
  const isInitialized = useRef(false);
  const hasPermission = useRef(false);
  const fcmToken = useRef<string | null>(null);
  const foregroundUnsubscribe = useRef<(() => void) | null>(null);
  const backgroundUnsubscribe = useRef<(() => void) | null>(null);
  const isHandlingNotification = useRef(false);

  /**
   * Initialize notification channels and permissions
   */
  const initializeNotifications = useCallback(async (): Promise<void> => {
    try {
      console.log('Initializing notifications...');
      
      // Create notification channels for Android
      await createNotificationChannels();
      
      // Request permissions
      const permissionGranted = await requestNotificationPermissions();
      hasPermission.current = permissionGranted;
      
      if (permissionGranted) {
        // Get FCM token
        const token = await getFCMToken();
        fcmToken.current = token;
        
        // Set up foreground message handler
        foregroundUnsubscribe.current = messaging().onMessage(async remoteMessage => {
          console.log('Foreground message received:', remoteMessage);
          
          // Prevent duplicate notifications
          if (isHandlingNotification.current) {
            console.log('Already handling notification, skipping...');
            return;
          }
          
          // Only handle messages that should be handled in foreground
          if (shouldHandleInForeground(remoteMessage)) {
            isHandlingNotification.current = true;
            try {
              await displayForegroundNotification(
                remoteMessage.notification?.title || 'New Message',
                remoteMessage.notification?.body || '',
                remoteMessage.data,
                NOTIFICATION_CHANNELS.HIGH_PRIORITY,
              );
            } finally {
              isHandlingNotification.current = false;
            }
          }
        });
        
        // Set up background message handler - only for data-only messages
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Background message received:', remoteMessage);
          
          // Prevent duplicate notifications
          if (isHandlingNotification.current) {
            console.log('Already handling background notification, skipping...');
            return;
          }
          
          // Only handle messages that should be handled in background
          if (shouldHandleInBackground(remoteMessage)) {
            isHandlingNotification.current = true;
            try {
              // Extract notification info from data payload
              const data = remoteMessage.data as Record<string, any>;
              const title = data.title || 'New Message';
              const body = data.body || data.message || '';
              
              await displayForegroundNotification(
                title,
                body,
                data,
                NOTIFICATION_CHANNELS.DEFAULT,
              );
            } finally {
              isHandlingNotification.current = false;
            }
          }
        });
      }
      
      isInitialized.current = true;
      console.log('Notifications initialized successfully');
    } catch (error) {
      console.error('Error initializing notifications:', error);
      throw error;
    }
  }, []);

  /**
   * Request notification permissions
   */
  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      const granted = await requestNotificationPermissions();
      hasPermission.current = granted;
      
      if (granted) {
        const token = await getFCMToken();
        fcmToken.current = token;
      }
      
      return granted;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }, []);

  /**
   * Display a notification
   */
  const displayNotification = useCallback(async (notification: NotificationData): Promise<string> => {
    try {
      return await displayForegroundNotification(
        notification.title,
        notification.body,
        notification.data,
        notification.channelId || NOTIFICATION_CHANNELS.DEFAULT,
      );
    } catch (error) {
      console.error('Error displaying notification:', error);
      throw error;
    }
  }, []);

  /**
   * Display a custom notification
   */
  const displayCustomNotificationCallback = useCallback(async (notification: NotificationData): Promise<string> => {
    try {
      return await displayCustomNotification(
        notification.title,
        notification.body,
        notification.data,
        {
          channelId: notification.channelId,
          sound: notification.sound,
          icon: notification.icon,
          color: notification.color,
          bigText: notification.bigText,
        },
      );
    } catch (error) {
      console.error('Error displaying custom notification:', error);
      throw error;
    }
  }, []);

  /**
   * Set up notification press handlers
   */
  const setupNotificationPressHandlers = useCallback((callback: (notification: any) => void) => {
    return onNotificationPress(callback);
  }, []);

  /**
   * Get FCM token
   */
  const getToken = useCallback(async (): Promise<string> => {
    try {
      const token = await getFCMToken();
      fcmToken.current = token;
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      throw error;
    }
  }, []);

  /**
   * Set up background notification press handlers
   */
  const setupBackgroundNotificationPressHandlers = useCallback((callback: (notification: any) => void) => {
    return onBackgroundNotificationPress(callback);
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (foregroundUnsubscribe.current) {
        foregroundUnsubscribe.current();
      }
      if (backgroundUnsubscribe.current) {
        backgroundUnsubscribe.current();
      }
    };
  }, []);

  return {
    isInitialized: isInitialized.current,
    hasPermission: hasPermission.current,
    fcmToken: fcmToken.current,
    getToken,
    initializeNotifications,
    requestPermissions,
    displayNotification,
    displayCustomNotification: displayCustomNotificationCallback,
    onNotificationPress: setupNotificationPressHandlers,
    onBackgroundNotificationPress: setupBackgroundNotificationPressHandlers,
  };
};

export {NOTIFICATION_CHANNELS, NOTIFICATION_TYPES}; 