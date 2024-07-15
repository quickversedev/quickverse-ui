import axios from 'axios';

const changePinService = (
  phoneNumber: string,
  campusId: string,
  oldPin: string,
  newPin: string,
): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        Response,
      });
    }, 1000);
  });
  //   return axios
  //     .post('http://192.168.0.102:8080/quickVerse/v1/changepin', {
  //       mobile: '91' + phoneNumber,
  //       campusId: campusId,
  //       oldPin: oldPin,
  //       NewPin: newPin,
  //     })
  //     .then(response => {
  //       return response;
  //     })
  //     .catch(error => {
  //       const {code} = error.response.data.error;
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         console.error(
  //           'Server responded with non-2xx status:',
  //           error.response.status,
  //         );
  //         console.error('Response data:', error.response.data);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error('No response received:', error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error('Error setting up the request:', error.message);
  //       }
  //       // Throw the error again to propagate it to the caller
  //       throw code;
  //     });
};
export default changePinService;
