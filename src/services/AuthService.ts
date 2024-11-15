import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import { fetchToken } from '../utils/KeychainStore/keychainUtil';

export type AuthData = {
  session: {
    token: string;
    phoneNumber: string;
    name: string;
    email: string;
  };
};

const signIn = async (
  phoneNumber: string, 
  pin: string,
  campusId: string,
): Promise<AuthData> => {
  const token = await fetchToken();
  try {
    const response = await axios.post(
      `${globalConfig.apiBaseUrl}/v1/login`,
      {
        mobile: '91' + phoneNumber,
        pin: pin,
        campusId: campusId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = response.data?.session;
    if (!data) {
      throw { code: 'DATA_ERROR', message: 'No session data received' };
    }

    return {
      session: {
        token: data.jwt,
        phoneNumber: data.mobile,
        name: data.userName,
        email: data.email,
      },
    };
  } catch (error: any) {
    const errorCode = error.response?.data?.error?.code || 'UNKNOWN_ERROR';
    const errorMessage =
      error.response?.data?.error?.message ||
      'An unknown error occurred during sign-in';

    console.error('Sign-in error:', errorMessage);
    throw { code: errorCode, message: errorMessage };
  }
};

const signUp = async (
  fullName: string,
  campusId: string,
  email: string,
  dob: string,
): Promise<any> => {
  const token = await fetchToken();
  try {
    const response = await axios.post(
      `${globalConfig.apiBaseUrl}/v1/registerUser`,
      {
        campusId: campusId,
        emailId: email,
        userName: fullName,
        dob: dob,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data) {
      throw {
        code: 'DATA_ERROR',
        message: 'No data received from sign-up response',
      };
    }

    return response.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.error?.code || 'UNKNOWN_ERROR';
    const errorMessage =
      error.response?.data?.error?.message ||
      'An unknown error occurred during sign-up';

    console.error('Sign-up error:', errorMessage);
    throw { code: errorCode, message: errorMessage };
  }
};

export const authService = {
  signIn,
  signUp,
};
