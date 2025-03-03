import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';

const CHANNEL_ID = 'default';

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const initializeNotificationService = async () => {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return;

  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    return await messaging().getToken();
  } catch (error) {
    console.error('Error fetching FCM Token:', error);
    return null;
  }
};

export const handleForegroundNotification = async (remoteMessage: any) => {
  if (!remoteMessage?.notification) return;

  await notifee.displayNotification({
    title: remoteMessage.notification.title || 'No title',
    body: remoteMessage.notification.body || 'No body',
    android: {
      channelId: CHANNEL_ID,
      importance: AndroidImportance.HIGH,
      largeIcon: 'qv_blue',
      color: '#8B8000',
      style: {
        type: AndroidStyle.BIGTEXT,
        text: remoteMessage.notification.body || 'No body',
      },
      showTimestamp: true,
    },
  });
};

export const setBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    await handleForegroundNotification(remoteMessage);
  });
};

export const startForegroundNotificationListener = () => {
  return messaging().onMessage(async (remoteMessage) => {
    await handleForegroundNotification(remoteMessage);
  });
};
