export interface Vehicle {
  id: string;
  name: string;
  rate: string;
  available: number;
  image: string;
  type: 'Scooty' | 'Bike'; // You can specify other types if needed
}
export const vehiclesData: Vehicle[] = [
  {
    id: '1',
    name: 'Activa 5g',
    rate: '100',
    available: 10,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/9/95/Honda_Activa.jpg',
    type: 'Scooty',
  },
  {
    id: '2',
    name: 'Maestro',
    rate: '150',
    available: 8,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/35/Hero_Maestro_Edge.jpg',
    type: 'Scooty',
  },
  {
    id: '3',
    name: 'Access 125',
    rate: '150',
    available: 8,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Suzuki_Access_125.jpg',
    type: 'Scooty',
  },
  {
    id: '4',
    name: 'Vespa',
    rate: '200',
    available: 0,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/68/Vespa_Sport_50cc.jpg',
    type: 'Scooty',
  },
  {
    id: '5',
    name: 'Ktm Duke',
    rate: '200',
    available: 4,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/79/KTM_390_Duke.jpg',
    type: 'Bike',
  },
  {
    id: '6',
    name: 'Kavasaki Ninja',
    rate: '200',
    available: 2,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f4/Kawasaki_Ninja_300.jpg',
    type: 'Bike',
  },
  {
    id: '7',
    name: 'Royal Enfield',
    rate: '200',
    available: 0,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/7d/Royal_Enfield_Classic_350.jpg',
    type: 'Bike',
  },
];
