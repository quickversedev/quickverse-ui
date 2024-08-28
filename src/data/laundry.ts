// mockShoesItems.ts

export type LaundryItems = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const mockLaundryItems: LaundryItems[] = [
  {id: 1, name: 'shoes 1', price: 1073, image: 'url-to-shoes1-image'},
  {id: 2, name: 'shoes 2', price: 3050, image: 'url-to-shoes2-image'},
  {id: 3, name: 'shoes 3', price: 2500, image: 'url-to-shoes3-image'},
  {id: 4, name: 'shoes 4', price: 2100, image: 'url-to-shoes4-image'},
  {id: 5, name: 'shoes 5', price: 1400, image: 'url-to-shoes5-image'},
  {id: 6, name: 'shoes 6', price: 700, image: 'url-to-shoes6-image'},
];
