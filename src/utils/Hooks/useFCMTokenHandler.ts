import {useEffect, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';
import {useNotification} from './useNotification';
import {sendFCMToken} from '../../services/apis/fcmApi';
import {useAuth} from '../AuthContext';
import {getFCMToken, setFCMToken} from '../Storage';

export const useFCMTokenHandler = () => {
  const {authData} = useAuth();
  const {getToken} = useNotification();

  const refreshFCMToken = useCallback(async () => {
    try {
      console.log('🔄 Refreshing FCM token...');

      // First try to get token from storage
      const storedToken = getFCMToken();
      // console.log('Stored token:', storedToken ? '✅ Present' : '❌ Missing');

      // If no stored token, fetch directly from Firebase
      let currentToken = storedToken;
      if (!currentToken) {
        // console.log('📱 No stored token, fetching from Firebase...');
        try {
          currentToken = await messaging().getToken();
          if (currentToken) {
            console.log('✅ Got new token from Firebase');
            setFCMToken(currentToken);
          } else {
            console.warn('❌ Firebase returned null token');
            return;
          }
        } catch (err) {
          console.error('❌ Error fetching token from Firebase:', err);
          return;
        }
      }

      // Only send to backend if user is logged in
      if (authData) {
        // console.log('📤 Sending FCM token to backend...');
        await sendFCMToken(storedToken || '', currentToken, authData);
        // console.log('✅ FCM token updated in backend');
      }
    } catch (error) {
      console.error('❌ Error in refreshFCMToken:', error);
      throw error;
    }
  }, [authData]);

  useEffect(() => {
    // Initial token refresh
    refreshFCMToken().catch(error => {
      console.error('❌ Initial FCM token refresh failed:', error);
    });

    // Listen for token refresh events
    const unsubscribe = messaging().onTokenRefresh(async newToken => {
      // console.log('🔄 FCM token refreshed by Firebase');

      const storedToken = getFCMToken();
      setFCMToken(newToken);

      // Only send to backend if user is logged in
      if (authData) {
        try {
          await sendFCMToken(storedToken || '', newToken, authData);
          // console.log('✅ Refreshed FCM token sent to backend');
        } catch (error) {
          console.error('❌ Error sending refreshed token to backend:', error);
        }
      }
    });

    return unsubscribe;
  }, [refreshFCMToken, authData]);

  return {
    refreshFCMToken,
  };
};

export default useFCMTokenHandler;
