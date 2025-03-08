import messaging, {
  FirebaseMessagingTypes,
  getMessaging,
  getToken,
  hasPermission,
  onMessage,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import {Platform, PermissionsAndroid} from 'react-native';

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

/**
 * Display a notification using Notifee.
 */
export const displayNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  try {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'No title',
      body: remoteMessage.notification?.body || 'No body',
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        largeIcon: 'qv_blue',
        color: '#8B8000',
        style: {
          type: AndroidStyle.BIGTEXT,
          text: remoteMessage.notification?.body || 'No body',
        },
        showTimestamp: true,
      },
    });
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
};

/**
 * Initialize the foreground message handler.
 */
export const initializeForegroundMessageHandler = () => {
  const message = getMessaging();
  return onMessage(message, async remoteMessage => {
    await displayNotification(remoteMessage);
  });
};

/**
 * Initialize the background message handler.
 */
export const initializeBackgroundMessageHandler = () => {
  const message = getMessaging();
  setBackgroundMessageHandler(message, async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    await displayNotification(remoteMessage);
  });
};

/**
 * Get the FCM token for the device.
 */
export const getFCMToken = async (): Promise<string> => {
  const message = messaging();
  const token = await getToken(message);
  console.log('FCM Token:', token);
  return token;
};

/**
 * Request notification permissions (required for iOS).
 */
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
