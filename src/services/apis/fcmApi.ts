import axios from 'axios';
import globalConfig from '../../utils/GlobalConfig';
import {getJWT} from '../../utils/Storage';

interface FCMTokenPayload {
  newFCMToken: string;
  fcmToken: string;
}

/**
 * Send FCM token to backend for storage and updates
 */
export const sendFCMToken = async (
  oldToken: string | undefined,
  newToken: string,
  authData?: string,
): Promise<void> => {
  try {
    const token = authData || getJWT();
    
    if (!token) {
      console.warn('No auth token available for FCM token update');
      return;
    }

    const payload: FCMTokenPayload = {
      newFCMToken: newToken,
      fcmToken: oldToken || '',
    };

    const response = await axios.put(
      `${globalConfig.apiBaseUrl}/v1/updateDeviceInfo`,
      payload,
      {
        headers: {
          sessionToken: token,
        },
      },
    );

    console.log('✅ FCM token updated successfully:', response.data);
  } catch (error: any) {
    console.error('❌ Error updating FCM token:', error.response?.data || error.message);
    throw error;
  }
};
