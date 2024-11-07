import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';

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
        pin: pin,
        campusId: campusId,
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
          name: data.userName,
          campus: 'iim ',
          email: data.email,
        },
      };
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
const signUp = async (
  fullName: string,
  campusId: string,
  email: string,
  dob: string,
): Promise<any> => {
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       Response,
  //     });
  //   }, 1000);
  // });
  const token = await fetchToken();
  return axios
<<<<<<< HEAD
    .post(`${globalConfig.apiBaseUrl}/v1/registerUser`, {
      campusId: campusId,
      emailId: email,
      userName: fullName,
      dob: dob,
    })
=======
    .post(
      `${globalConfig.apiBaseUrl}/v1/registerUser`,
      {
        mobile: '91' + phoneNumber,
        pin: pin,
        campusId: campusId,
        emailId: email,
        userName: fullName,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
>>>>>>> cde7ca800c4433f806666f1c922568986847c881
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
  signIn,
  signUp,
};

// const JWTTokenMock =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
