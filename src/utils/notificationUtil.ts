import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
  AndroidColor,
} from '@notifee/react-native';
import {Platform} from 'react-native';

// Notification channel IDs
export const NOTIFICATION_CHANNELS = {
  DEFAULT: 'default',
  HIGH_PRIORITY: 'high-priority',
  CUSTOM_SOUND: 'custom-sound',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  ORDER_UPDATE: 'order_update',
  PROMO: 'promo',
  GENERAL: 'general',
} as const;

/**
 * Get FCM token for the device
 */
export const getFCMToken = async (): Promise<string> => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    throw error;
  }
};

/**
 * Create notification channels for Android
 */
export const createNotificationChannels = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    // Default channel
    await notifee.createChannel({
      id: NOTIFICATION_CHANNELS.DEFAULT,
      name: 'Default Notifications',
      importance: AndroidImportance.DEFAULT,
      sound: 'default',
    });

    // High priority channel
    await notifee.createChannel({
      id: NOTIFICATION_CHANNELS.HIGH_PRIORITY,
      name: 'High Priority Notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });

    // Custom sound channel
    await notifee.createChannel({
      id: NOTIFICATION_CHANNELS.CUSTOM_SOUND,
      name: 'Custom Sound Notifications',
      importance: AndroidImportance.HIGH,
      sound: 'noti',
      vibration: true,
    });
  }
};

/**
 * Display a foreground notification using Notifee
 */
export const displayForegroundNotification = async (
  title: string,
  body: string,
  data?: Record<string, any>,
  channelId: string = NOTIFICATION_CHANNELS.DEFAULT,
): Promise<string> => {
  try {
    const notificationId = await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        smallIcon: 'qv_blue',
        color: '#007AFF',
        style: {
          type: AndroidStyle.BIGTEXT,
          text: body,
        },
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        attachments: [],
      },
    });

    console.log('Foreground notification displayed with ID:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error displaying foreground notification:', error);
    throw error;
  }
};

/**
 * Display a notification with custom styling
 */
export const displayCustomNotification = async (
  title: string,
  body: string,
  data?: Record<string, any>,
  options?: {
    channelId?: string;
    sound?: string;
    icon?: string;
    color?: string;
    bigText?: string;
  },
): Promise<string> => {
  try {
    const notificationId = await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId: options?.channelId || NOTIFICATION_CHANNELS.HIGH_PRIORITY,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        smallIcon: options?.icon || 'qv_blue',
        color: options?.color || '#007AFF',
        sound: options?.sound || 'default',
        style: options?.bigText
          ? {
              type: AndroidStyle.BIGTEXT,
              text: options.bigText,
            }
          : undefined,
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        attachments: [],
      },
    });

    console.log('Custom notification displayed with ID:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error displaying custom notification:', error);
    throw error;
  }
};

/**
 * Cancel a specific notification
 */
export const cancelNotification = async (notificationId: string): Promise<void> => {
  try {
    await notifee.cancelNotification(notificationId);
    console.log('Notification cancelled:', notificationId);
  } catch (error) {
    console.error('Error cancelling notification:', error);
    throw error;
  }
};

/**
 * Cancel all notifications
 */
export const cancelAllNotifications = async (): Promise<void> => {
  try {
    await notifee.cancelAllNotifications();
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
    throw error;
  }
};

/**
 * Get badge count (iOS only)
 */
export const getBadgeCount = async (): Promise<number> => {
  try {
    const count = await notifee.getBadgeCount();
    return count;
  } catch (error) {
    console.error('Error getting badge count:', error);
    return 0;
  }
};

/**
 * Set badge count (iOS only)
 */
export const setBadgeCount = async (count: number): Promise<void> => {
  try {
    await notifee.setBadgeCount(count);
    console.log('Badge count set to:', count);
  } catch (error) {
    console.error('Error setting badge count:', error);
    throw error;
  }
};

/**
 * Request notification permissions
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    console.log('Notification permission status:', authStatus);
    return enabled;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

/**
 * Check if notifications are enabled
 */
export const checkNotificationPermissions = async (): Promise<boolean> => {
  try {
    const authStatus = await messaging().hasPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED;
  } catch (error) {
    console.error('Error checking notification permissions:', error);
    return false;
  }
};

/**
 * Handle notification press events
 */
export const onNotificationPress = (callback: (notification: any) => void) => {
  return notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS) {
      console.log('Notification pressed:', detail.notification);
      callback(detail.notification);
    }
  });
};

/**
 * Handle background notification events
 */
export const onBackgroundNotificationPress = (callback: (notification: any) => void) => {
  notifee.onBackgroundEvent(async ({type, detail}) => {
    if (type === EventType.PRESS) {
      console.log('Background notification pressed:', detail.notification);
      callback(detail.notification);
    }
  });
};

/**
 * Check if message should be handled by foreground handler
 */
export const shouldHandleInForeground = (remoteMessage: any): boolean => {
  // Only handle messages with notification payload in foreground
  // Data-only messages should be handled in background
  return !!remoteMessage.notification;
};

/**
 * Check if message should be handled by background handler
 */
export const shouldHandleInBackground = (remoteMessage: any): boolean => {
  // Only handle data-only messages in background
  // Messages with notification payload are handled by system
  return !remoteMessage.notification && !!remoteMessage.data;
};
