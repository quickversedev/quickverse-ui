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

      // Get the stored token
      const storedToken = getFCMToken();
      console.log('Stored token:', storedToken ? '✅ Present' : '❌ Missing');

      // Always fetch fresh token from Firebase
      let currentToken;
      try {
        currentToken = await messaging().getToken();
        if (!currentToken) {
          console.warn('❌ Firebase returned null token');
          return;
        }
        console.log('✅ Got token from Firebase');
      } catch (err) {
        console.error('❌ Error fetching token from Firebase:', err);
        return;
      }

      // Compare tokens and update storage if needed
      if (currentToken !== storedToken) {
        console.log('📝 Token changed, updating storage');
        setFCMToken(currentToken);

        // Only send to backend if user is logged in
        if (authData && storedToken && currentToken) {
          console.log('📤 Sending new FCM token to backend...');
          await sendFCMToken(storedToken, currentToken, authData);
          console.log('✅ FCM token updated in backend');
        }
      } else {
        console.log('✓ Token unchanged, skipping backend update');
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
