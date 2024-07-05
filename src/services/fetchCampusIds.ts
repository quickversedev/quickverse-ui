import axios from 'axios';

 import campusses from "../data/campus";
export interface Campus {
  campusId: string;
  campusName: string;
  location: string;
  vendors?: {} | undefined;
}

export const fetchCampusIds = (): Promise<Campus[]> => {
  return new Promise(resolve => {
    // Simulate network delay with setTimeout
    setTimeout(() => {
      resolve(campusses);
    }, 1000); // 1 second delay
  });
  // return axios
  //   .get('http://192.168.31.144:8080/quickVerse/v1/campus')
  //   .then(response => {
  //     const data = response.data;
  //     return data.campuses.campus;
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
