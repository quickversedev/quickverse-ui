import foodItems from '../data/foodItems';

export const fetchFoodItems = async (): Promise<typeof foodItems> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(foodItems);
    }, 1000); // Simulate a network delay of 1 second
  });
};

export default fetchFoodItems;
