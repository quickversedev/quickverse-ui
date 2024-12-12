import axios from 'axios';

// import campusses from '../data/campus'
import {config} from '../utils/canonicalModel';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';

export const fetchConfigs = async (campus: string): Promise<config> => {
  const token = await fetchToken();
  return axios
    .get(`${globalConfig.apiBaseUrl}/v1/campus/${campus}/configuration`, {
      headers: {
        Authorization: token,
      },
    })
    .then(response => {
      const data = response.data;
      return data;
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
