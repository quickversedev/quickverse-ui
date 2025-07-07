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
      
      // Get current FCM token from Firebase
      const currentToken = await getToken();
      const storedToken = getFCMToken();
      
      console.log('Current token:', currentToken ? '✅ Present' : '❌ Missing');
      console.log('Stored token:', storedToken ? '✅ Present' : '❌ Missing');
      
      if (!currentToken) {
        console.warn('❌ FCM token is null or undefined');
        return;
      }

      // Store the new token locally
      setFCMToken(currentToken);

      // Only send to backend if user is logged in and token changed
      if (authData && (!storedToken || storedToken !== currentToken)) {
        console.log('📤 Sending FCM token to backend...');
        await sendFCMToken(storedToken, currentToken, authData);
        console.log('✅ FCM token updated in backend');
      } else if (!authData) {
        console.log('ℹ️ User not logged in, skipping backend update');
      } else {
        console.log('ℹ️ FCM token unchanged, skipping backend update');
      }
    } catch (error) {
      console.error('❌ Error refreshing FCM token:', error);
      throw error;
    }
  }, [getToken, authData]);



  useEffect(() => {
    // Initial token refresh
    refreshFCMToken().catch(error => {
      console.error('❌ Initial FCM token refresh failed:', error);
    });

    // Listen for token refresh events
    const unsubscribe = messaging().onTokenRefresh(async newToken => {
      console.log('🔄 FCM token refreshed by Firebase');
      
      const storedToken = getFCMToken();
      setFCMToken(newToken);
      
      // Only send to backend if user is logged in and token changed
      if (authData && storedToken && storedToken !== newToken) {
        try {
          await sendFCMToken(storedToken, newToken, authData);
          console.log('✅ Refreshed FCM token sent to backend');
        } catch (error) {
          console.error('❌ Error sending refreshed token to backend:', error);
        }
      } else if (!authData) {
        console.log('ℹ️ User not logged in, skipping backend update for refreshed token');
      }
    });

    return unsubscribe;
  }, [refreshFCMToken, authData]);

  return {
    refreshFCMToken,
  };
};

export default useFCMTokenHandler; 