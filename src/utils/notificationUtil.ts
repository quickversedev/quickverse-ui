import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import { Platform, PermissionsAndroid } from 'react-native';

export const initializeNotificationChannel = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
  }

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};

export const displayNotification = async (remoteMessage: any) => {
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
    console.error("Error displaying notification:", error);
  }
};

export const initializeForegroundMessageHandler = () => {
  return messaging().onMessage(async remoteMessage => {
    await displayNotification(remoteMessage);
  });
};

export const initializeBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    await displayNotification(remoteMessage);
  });
};

export const getFCMToken = async () => {
  const token = await messaging().getToken();
  return token;
};