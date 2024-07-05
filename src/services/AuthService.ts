import axios from 'axios';

export type AuthData = {
  session: {
    token: string;
    phoneNumber: string;
    name: string;
    email: string;
  };
};
const signIn = (
  phoneNumber: string,
  pin: string,
  campusId: string,
): Promise<AuthData> => {
  //*********************mock****************
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        session: {
          token: JWTTokenMock,
          phoneNumber: phoneNumber,
          name: 'Lucas Garcez',
          //campus: 'IIM Udaipur',
          email: 'mithiladongre@gmail.com',
        },
      });
    }, 1000);
  });
  // return axios
  //   .post('http://192.168.31.144:8080/quickVerse/v1/login', {
  //     mobile: '91' + phoneNumber,
  //     pin: pin,
  //     campusId: campusId,
  //   })
  //   .then(response => {
  //     const data1 = response.data;
  //     const data = data1?.session;
  //     return {
  //       session: {
  //         token: data.jwt,
  //         phoneNumber: data.mobile,
  //         name: data.userName,
  //         campus: 'iim ',
  //         email: data.email,
  //       },
  //     };
  //   })
  //   .catch(error => {
  //     const {code} = error.response.data.error;
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       console.error(
  //         'Server responded with non-2xx status:',
  //         error.response.status,
  //       );
  //       console.error('Response data:', error.response.data);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error('No response received:', error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error('Error setting up the request:', error.message);
  //     }
  //     // Throw the error again to propagate it to the caller
  //     throw code;
  //   });
};
const signUp = (
  fullName: string,
  phoneNumber: string,
  campusId: string,
  email: string,
  pin: string,
): Promise<any> => {
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       session: {
  //         token: JWTTokenMock,
  //         phoneNumber: phoneNumber,
  //         name: 'Lucas Garcez',
  //         campus: 'IIM Udaipur',
  //         email: email,
  //       },
  //     });
  //   }, 1000);
  // });
  return axios
    .post('http://192.168.31.144:8080/quickVerse/v1/registerUser', {
      loginId: '91' + phoneNumber,
      pin: pin,
      campusId: campusId,
      emailId: email,
      userName: fullName,
      createdDate: '2024-02-04',
    })
    .then(response => {
      return response;
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
      throw code;
    });
};
export const authService = {
  signIn,
  signUp,
};

const JWTTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
