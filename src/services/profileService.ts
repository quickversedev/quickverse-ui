import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';

const profileService = (
  phoneNumber: string,
  campusId: string,
  email: string,
  subject: string,
  body: string,
): Promise<any> => {
  return axios
    .post(`${globalConfig.apiBaseUrl}/v1/email`, {
      mobile: '91' + phoneNumber,
      body: body,
      campusId: campusId,
      receiver: email,
      subject: subject,
    })
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
export default profileService;
