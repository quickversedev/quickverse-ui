// data/mockCategoriesData.ts

export interface Category {
  id: string;
  name: string;
  description: string;
  imageURLs: string[];
  type: string;
  parentCategory: string | null;
  countOfSkus: number;
}

// Mock categories data
export const mockCategoriesData: Category[] = [
  {
    id: 'c1',
    name: 'Mobile Phones',
    description: '|',
    imageURLs: [
      'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png',
    ],
    type: 'MANAGED',
    parentCategory: null,
    countOfSkus: 1,
  },
  {
    id: 'c2',
    name: 'Electronics',
    description: '|',
    imageURLs: [
      'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/New_Bakery.png',
    ],
    type: 'MANAGED',
    parentCategory: null,
    countOfSkus: 1,
  },
  {
    id: 'c3',
    name: 'Laptops',
    description: '|',
    imageURLs: [
      'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Instant_Food.png',
    ],
    type: 'MANAGED',
    parentCategory: null,
    countOfSkus: 8,
  },
  {
    id: 'c4',
    name: 'Wearables',
    description: '|',
    imageURLs: [
      'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Gourmet_Food.png',
    ],
    type: 'MANAGED',
    parentCategory: null,
    countOfSkus: 35,
  },
  {
    id: 'c5',
    name: 'Computer Accessories',
    description: '|',
    imageURLs: [
      'https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Beverages.png',
    ],
    type: 'MANAGED',
    parentCategory: null,
    countOfSkus: 8,
  },
  {
    id: 'c6',
    name: 'Beverages',
    description: '|',
    imageURLs: ['https://example.com/path/to/beverages_image.jpg'],
    type: 'MANAGED',
    parentCategory: null,
    countOfSkus: 1,
  },
  {
    id: 'c7',
    name: 'Snacks',
    description: '|',
    imageURLs: ['https://example.com/path/to/snacks_image.jpg'],
    type: 'MANAGED',
    parentCategory: null,
    countOfSkus: 1,
  },
];

// Exporting the mock data
export default mockCategoriesData;
