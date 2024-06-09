import venderList from '../data/venderList';

export const fetchVenderList = async (): Promise<typeof venderList> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(venderList);
    }, 2000); // Simulate a network delay of 1 second
  });
};

export default fetchVenderList;
