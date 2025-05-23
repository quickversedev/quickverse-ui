import messaging, {
  FirebaseMessagingTypes,
  getMessaging,
  getToken,
  hasPermission,
  onMessage,
} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidBadgeIconType,
} from '@notifee/react-native';
import {Platform, PermissionsAndroid} from 'react-native';

interface NotificationCache {
  id: string;
  timestamp: number;
}
let lastNotification: NotificationCache | null = null;
const NOTIFICATION_COOLDOWN_MS = 5000; // 5 second deduplication window
/**
 * Initialize the notification channel for Android.
 */
export const initializeNotificationChannel = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      return;
    }
  }

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};
const getNotificationId = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): any => {
  return (
    remoteMessage.messageId ||
    remoteMessage.data?.notificationId ||
    JSON.stringify(remoteMessage.data) ||
    `${Date.now()}`
  );
};
export const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  isBackground: boolean = false,
) => {
  try {
    const notificationId = getNotificationId(remoteMessage);
    const currentTime = Date.now();

    // Deduplication check
    if (
      lastNotification &&
      lastNotification.id === notificationId &&
      currentTime - lastNotification.timestamp < NOTIFICATION_COOLDOWN_MS
    ) {
      console.log('Skipping duplicate notification');
      return;
    }

    lastNotification = {
      id: notificationId,
      timestamp: currentTime,
    };

    if (!remoteMessage.notification) {
      console.log('No notification content available');
      return;
    }
    // Check if the notification object is present
    if (remoteMessage.notification) {
      await notifee.displayNotification({
        title: remoteMessage.notification.title || 'No title',
        body: remoteMessage.notification.body || 'No body',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          badgeIconType: AndroidBadgeIconType.LARGE,
          smallIcon: 'qv_blue', // Ensure this resource exists in your app
          largeIcon: 'qv_blue', // Ensure this resource exists in your app
          color: '#8B8000',
          style: {
            type: AndroidStyle.BIGTEXT,
            text: remoteMessage.notification.body || 'No body',
          },
          showTimestamp: true,
          groupId: isBackground ? 'background' : 'foreground',
        },
      });
    } else {
      console.log('Notification is undefined. Skipping display.');
    }
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};
/**
 * Initialize the foreground message handler.
 */
export const initializeForegroundMessageHandler = () => {
  console.log('Message handled in the background!');
  const message = getMessaging();
  return onMessage(message, async remoteMessage => {
    await displayNotification(remoteMessage, false);
  });
};

/**
 * Initialize the background message handler.
 */

export const initializeBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async () => {
    return Promise.resolve();
  });
  messaging().onMessage(async remoteMessage => {
    await displayNotification(remoteMessage, true);
  });
};
/**
 * Get the FCM token for the device.
 */
export const getFCMToken = async (): Promise<string> => {
  const message = messaging();
  const token = await getToken(message);
  return token;
};

/**
 * Request notification permissions (required for iOS).
 */
//todo
export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'ios') {
    const message = getMessaging();
    const authStatus = await hasPermission(message);
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permissions granted.');
    } else {
      console.log('Notification permissions denied.');
    }
  }
};

/**
 * Check if the app has notification permissions.
 */
export const checkNotificationPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const message = getMessaging();
    const authStatus = await hasPermission(message);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } else {
    return true;
  }
};
