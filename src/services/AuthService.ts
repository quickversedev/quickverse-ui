import axios from 'axios';

export type AuthData = {
  session: {
    token: string;
    phoneNumber: string;
    name: string;
    campus: string;
    email: string;
  };
};
const signIn = (
  phoneNumber: string,
  _pin: string,
  _campusId: string,
): Promise<AuthData> => {
  //*********************mock****************
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       session: {
  //         token: JWTTokenMock,
  //         phoneNumber: phoneNumber,
  //         name: 'Lucas Garcez',
  //         campus: 'IIM Udaipur',
  //       },
  //     });
  //   }, 1000);
  // });
  return axios
    .post('http://192.168.31.144:8080/quickVerse/v1/login', {
      mobile: '91' + phoneNumber,
      pin: _pin,
      campusId: 'IIMU-313001',
    })
    .then(response => {
      const data1 = response.data;
      console.log('Dataaa', data1);
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
        console.error(
          'Server responded with non-2xx status:',
          error.response.status,
        );
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
      // Throw the error again to propagate it to the caller
      console.log('erorrrrrr', code);
      throw code;
    });
};
const signUp = (
  fullName: string,
  phoneNumber: string,
  _campusId: string,
  email: string,
  _pin: string,
): Promise<AuthData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        session: {
          token: JWTTokenMock,
          phoneNumber: phoneNumber,
          name: 'Lucas Garcez',
          campus: 'IIM Udaipur',
          email: email,
        },
      });
    }, 1000);
  });
};
export const authService = {
  signIn,
  signUp,
};

const JWTTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
