import axios from 'axios';

// import campusses from '../data/campus';
import {Campus} from '../utils/canonicalModel';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';

export const fetchCampusIds = async (): Promise<Campus[]> => {
  // return new Promise(resolve => {
  //   // Simulate network delay with setTimeout
  //   setTimeout(() => {
  //     resolve(campusses);
  //   }, 1000); // 1 second delay
  // });
  const token = await fetchToken();
  console.log('token:', token);
  return axios
    .get(`${globalConfig.apiBaseUrl}/v1/campus`, {
      headers: {
        Authorization: token,
      },
    })
    .then(response => {
      const data = response.data;
      return data.campuses.campus;
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
