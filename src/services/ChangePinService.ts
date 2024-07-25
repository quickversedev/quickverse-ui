import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';

const changePinService = (
  phoneNumber: string,
  campusId: string,
  oldPin: string,
  newPin: string,
): Promise<any> => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve({
  //         Response,
  //       });
  //     }, 1000);
  //   });
  return axios
    .put(`${globalConfig.apiBaseUrl}/v1/changePin`, {
      mobile: phoneNumber,
      campusId: campusId,
      oldpin: oldPin,
      newpin: newPin,
    })
    .then(response => {
      return response;
    })
    .catch(error => {
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

      throw error;
    });
};
export default changePinService;
