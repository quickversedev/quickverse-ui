// mockData.ts
// import {Promo} from './promoModel';

import {Promo} from '../utils/canonicalModel';

export const mockPromoData: Promo[] = [
  {
    campusId: 'IIMU-313001',
    promoId: 9,
    promoImage: 'https://imgur.com/3JdZJeI',
    promoLink: 'https://www.smartbiz.in/MarinoMountainDinning',
    promoName: '10% Flat Discount',
    vendorId: 'IIMU-001',
  },
  // Add more promo objects as needed
  {
    campusId: 'IIMU-313001',
    promoId: 10,
    promoImage: 'https://imgur.com/yw0bqUO',
    promoLink: 'https://www.smartbiz.in/AnotherPromo',
    promoName: '20% Off on Selected Items',
    vendorId: 'IIMU-002',
  },
  {
    campusId: 'IIMU-313001',
    promoId: 11,
    promoImage: 'https://imgur.com/3JdZJeI',
    promoLink: 'https://www.smartbiz.in/SummerSale',
    promoName: 'Summer Sale - Up to 50% Off',
    vendorId: 'IIMU-003',
  },
];
