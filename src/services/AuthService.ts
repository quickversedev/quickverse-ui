import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';
import {getJWT} from '../utils/Storage';

export type AuthData = {
  session: {
    token: string;
    phoneNumber: string;
    newUser: boolean;
    campus: string;
    name: string;
    email: string;
  };
};
const sendOtp = async (phoneNumber: string): Promise<any> => {
  //*********************mock****************
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       session: {
  //         token: JWTTokenMock,
  //         phoneNumber: phoneNumber,
  //         name: 'Lucas Garcez',
  //         //campus: 'IIM Udaipur',
  //         email: 'mithiladongre@gmail.com',
  //       },
  //     });
  //   }, 1000);
  // });
  const token = await fetchToken();
  return axios
    .post(
      `${globalConfig.apiBaseUrl}/v1/requestOtp`,
      {
        mobile: '91' + phoneNumber,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .catch(error => {
      if (error?.response) {
        // The request was made and the server responded with a status code
        console.log(
          'Server responded with non-2xx status:',
          error.response.status,
        );
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error setting up the request:', error.message);
      }
      // Throw the error again to propagate it to the caller
      throw error;
    });
};
const VerifyOtp = async (
  phoneNumber: string,
  otp: string,
): Promise<AuthData> => {
  //*********************mock****************
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       session: {
  //         token: JWTTokenMock,
  //         phoneNumber: phoneNumber,
  //         name: 'Lucas Garcez',
  //         //campus: 'IIM Udaipur',
  //         email: 'mithiladongre@gmail.com',
  //       },
  //     });
  //   }, 1000);
  // });
  const token = await fetchToken();
  return axios
    .post(
      `${globalConfig.apiBaseUrl}/v1/login`,
      {
        mobile: '91' + phoneNumber,
        otp: otp,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(response => {
      const data1 = response.data;
      const data = data1?.session;
      return {
        session: {
          token: data.jwt,
          phoneNumber: data.mobile,
          newUser: data.newUser,
          name: data.userName,
          campus: data.campus,
          email: data.email,
        },
      };
    })
    .catch(error => {
      if (error?.response) {
        // The request was made and the server responded with a status code
        console.log(
          'Server responded with non-2xx status:',
          error.response.status,
        );
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error setting up the request:', error.message);
      }
      // Throw the error again to propagate it to the caller
      throw error;
    });
};
const signUp = async (
  fullName: string,
  dob: string,
  campusId: string,
  email: string,
): Promise<any> => {
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       Response,
  //     });
  //   }, 1000);
  // });
  const token = getJWT();
  return axios
    .post(
      `${globalConfig.apiBaseUrl}/v1/registerUser`,
      {
        birthdate: dob,
        campusId: campusId,
        emailId: email,
        userName: fullName,
      },
      {
        headers: {
          SessionKey: token,
        },
      },
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      const {code} = error.response.data.error;
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(
          'Server responded with non-2xx status:',
          error.response.status,
        );
        console.log('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error setting up the request:', error.message);
      }
      // Throw the error again to propagate it to the caller
      throw code;
    });
};
export const authService = {
  VerifyOtp,
  sendOtp,
  signUp,
};

// const JWTTokenMock =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
