
import React, {useEffect, useState} from 'react';
import LoggedIn from '../Components/Login/LoggedIn';
import {useNotification} from '../utils/Hooks/useNotification';
import {useFCMTokenHandler} from '../utils/Hooks/useFCMTokenHandler';
import {Platform, Alert, Linking, PermissionsAndroid, ActivityIndicator, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import theme from '../theme';

export const AppStack = () => {
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const {
    initializeNotifications,
    onNotificationPress,
    onBackgroundNotificationPress,
  } = useNotification();

  const {refreshFCMToken} = useFCMTokenHandler();

  const requestLocationPermissionAndroid = async (): Promise<boolean> => {
    try {
      const alreadyGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (alreadyGranted) {
        setLocationPermissionGranted(true);
        return true;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to find nearby campuses.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      setLocationPermissionGranted(isGranted);
      return isGranted;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  const requestLocationPermissionIOS = async (): Promise<boolean> => {
    try {
      const status = await Geolocation.requestAuthorization('whenInUse');
      const isGranted = status === 'granted';
      setLocationPermissionGranted(isGranted);
      return isGranted;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  const checkAndRequestLocationPermission = async () => {
    let hasPermission = false;

    if (Platform.OS === 'android') {
      hasPermission = await requestLocationPermissionAndroid();
    } else if (Platform.OS === 'ios') {
      hasPermission = await requestLocationPermissionIOS();
    }

    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please enable location permissions in settings to use this feature.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setIsInitializing(false),
          },
          {
            text: 'Open Settings',
            onPress: () => {
              setIsInitializing(false);
              Linking.openSettings();
            },
          },
        ],
      );
    } else {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    // Initialize notifications and location permissions when the app starts
    const initializeApp = async () => {
      try {
        await Promise.all([
          initializeNotifications(),
          checkAndRequestLocationPermission(),
        ]);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsInitializing(false);
      }
    };

    initializeApp();

    // Set up notification press handlers
    const foregroundUnsubscribe = onNotificationPress(notification => {
      console.log('Notification pressed:', notification);
    });

    onBackgroundNotificationPress(notification => {
      console.log('Background notification pressed:', notification);
    });

    // Cleanup on unmount
    return () => {
      if (typeof foregroundUnsubscribe === 'function') {
        foregroundUnsubscribe();
      }
    };
  }, [initializeNotifications, onNotificationPress, onBackgroundNotificationPress]);

  if (isInitializing) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary}}>
        <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
    );
  }

  return <LoggedIn />;
};
