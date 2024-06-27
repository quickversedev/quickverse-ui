export interface VenderList {
  id: string;
  name: string;
  image: any; //base64
  description: string;
  distance: string;
  link: string;
  enable: boolean;
}

const venderList: VenderList[] = [
  {
    id: '1',
    name: 'uday kirana',
    image: require('../data/images/a1.jpg'),
    description: 'Delicious cheese pizza with toppings.',
    distance: '5km',
    link: 'https://www.smartbiz.in/paajikirasoi',
    enable: true,
  },
  {
    id: '2',
    name: 'minakshi hotel1',
    image: require('../data/images/a2.jpg'),
    description: 'Juicy beef burger with fresh lettuce.',
    distance: '100km',
    link: 'https://www.smartbiz.in/ashokafoodcorner',
    enable: false,
  },
  {
    id: '3',
    name: 'Sushi palace',
    image: require('../data/images/a3.jpg'),
    description: 'Fresh sushi with a variety of seafood.',
    distance: '5km',
    link: 'https://www.smartbiz.in/AbhinavFreshFruitandJuice',
    enable: true,
  },
  {
    id: '4',
    name: 'Pasta street',
    image: require('../data/images/a4.jpg'),
    description: 'Creamy pasta with Alfredo sauce.',
    distance: '5km',
    link: 'https://www.smartbiz.in/AbhinavFreshFruitandJuice',
    enable: true,
  },
  //   {
  //     id: '5',
  //     name: 'Salad bowl',
  //     image: require('../data/images/a1.jpg'),
  //     description: 'Healthy green salad with a variety of vegetables.',
  //     distance: '5km',
  //     link: '',
  //   },
  {
    id: '6',
    name: 'minakshi hotel',
    image: require('../data/images/a2.jpg'),
    description: 'Juicy beef burger with fresh lettuce.',
    distance: '5km',
    link: 'https://www.smartbiz.in/AbhinavFreshFruitandJuice',
    enable: true,
  },
  {
    id: '7',
    name: 'minakshi hotel',
    image: require('../data/images/a2.jpg'),
    description: 'Juicy beef burger with fresh lettuce.',
    distance: '5km',
    link: 'https://www.smartbiz.in/AbhinavFreshFruitandJuice',
    enable: false,
  },
  {
    id: '8',
    name: 'minakshi hotel',
    image: require('../data/images/a2.jpg'),
    description: 'Juicy beef burger with fresh lettuce.',
    distance: '5km',
    link: 'https://www.smartbiz.in/AbhinavFreshFruitandJuice',
    enable: true,
  },
];

export default venderList;
