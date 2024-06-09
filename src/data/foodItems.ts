export interface FoodItem {
  id: string;
  name: string;
  image: any; //base64
  description?: string;
  link: string;
}

const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Pizza',
    image: require('../data/images/a1.jpg'), //base64 format
    description: 'Delicious cheese pizza with toppings.',
    link: 'undefined',
  },
  {
    id: '2',
    name: 'Burger',
    image: require('../data/images/a2.jpg'),
    description: 'Juicy beef burger with fresh lettuce.',
    link: 'undefined',
  },
  {
    id: '3',
    name: 'Sushi',
    image: require('../data/images/a3.jpg'),
    description: 'Fresh sushi with a variety of seafood.',
    link: 'undefined',
  },
  {
    id: '4',
    name: 'Pasta',
    image: require('../data/images/a4.jpg'),
    description: 'Creamy pasta with Alfredo sauce.',
    link: 'undefined',
  },
  {
    id: '5',
    name: 'Salad',
    image: require('../data/images/a1.jpg'),
    description: 'Healthy green salad with a variety of vegetables.',
    link: 'undefined',
  },
];

export default foodItems;
