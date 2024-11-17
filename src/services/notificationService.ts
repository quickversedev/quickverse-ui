import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const initializeNotificationService = async (): Promise<void> => {
  const permissionGranted = await requestNotificationPermission();
  if (!permissionGranted) return;

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const token = await messaging().getToken();
  console.log('FCM Token:', token);
};

export const onForegroundMessage = async (remoteMessage: any): Promise<void> => {
  try {
    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'No title',
      body: remoteMessage.notification?.body || 'No body',
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        largeIcon: 'https://res.cloudinary.com/dawnwcuvn/image/upload/v1730445853/WhatsApp_Image_2024-10-27_at_1.54.22_PM-removebg-preview_ffs4c5_c_pad_ar_1_1_wha8jx.png',
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

export const setUpBackgroundMessageHandler = (): void => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    try {
      console.log('Message handled in the background!', remoteMessage);
      await onForegroundMessage(remoteMessage);
    } catch (error) {
      console.error('Error displaying background notification:', error);
    }
  });
};
