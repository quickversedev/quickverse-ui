export interface FoodItem {
  id: string;
  name?: string;
  image?: any;
  description?: string;
}

const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Pizza',
    image: require('../data/images/a1.jpg'),
    description: 'Delicious cheese pizza with toppings.',
  },
  {
    id: '2',
    name: 'Burger',
    image: require('../data/images/a2.jpg'),
    description: 'Juicy beef burger with fresh lettuce.',
  },
  {
    id: '3',
    name: 'Sushi',
    image: require('../data/images/a3.jpg'),
    description: 'Fresh sushi with a variety of seafood.',
  },
  {
    id: '4',
    name: 'Pasta',
    image: require('../data/images/a4.jpg'),
    description: 'Creamy pasta with Alfredo sauce.',
  },
  {
    id: '5',
    name: 'Salad',
    image: require('../data/images/a1.jpg'),
    description: 'Healthy green salad with a variety of vegetables.',
  },
];

export default foodItems;
