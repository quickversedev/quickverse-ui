import {fetchCampusIds} from '../../services/fetchCampusIds';

const fetchOptions = async () => {
  try {
    const response = await fetchCampusIds();
    let cam: string[] = [];
    cam =
      response && response.length > 1
        ? response.map(campus => {
            return campus.campusId + ' | ' + campus.campusName;
          })
        : [];
    return cam;
  } catch (error) {
    console.log('Error fetching ', error);
    throw error;
  }
};
export default fetchOptions;
