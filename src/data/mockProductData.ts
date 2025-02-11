// data/mockProductData.ts

export interface BuyingOptions {
  singlePurchase: {
    availability: {
      inStock: boolean;
      buyable: boolean;
      limitedStock: boolean;
      isBuyable: boolean;
    };
  };
}

export interface Product {
  sku: string;
  barcodeID: string | null;
  name: string;
  mrp: number;
  sellingPrice: number;
  deactivated: boolean;
  gst: number | null;
  hsn: string | null;
  category: string;
  division: string;
  subDivision: string | null;
  brand: string | null;
  productAttributes: string[];
  asin: string | null;
  productDescription: string;
  productImageUrl: string;
  uom: string | null;
  additionalAttributes: string;
  buyingOptions: BuyingOptions;
  secondaryImageUrl: string | null;
  secondaryImagesUrlToDelete: string | null;
  imagesUrlToDeleteFromS3: string | null;
  discount: number;
  numberOfVariants: number;
  currentStock: number | null;
  primaryProductId: string;
  variantsDimensions: string[];
  shopId: string;
}

// Mock product data
export const mockProductData: Product[] = [
  {
    sku: '835458c624d81702043422',
    barcodeID: null,
    name: 'Cold Coffee 1',
    mrp: 55.0,
    sellingPrice: 55.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1',
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Cold Coffee',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '835458c624d81702043422',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '835458c624d81702422',
    barcodeID: null,
    name: 'Cold Coffee 2',
    mrp: 55.0,
    sellingPrice: 55.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1',
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Cold Coffee',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '835458c624d81702043422',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '83545824d81702043422',
    barcodeID: null,
    name: 'Cold Coffee 3',
    mrp: 55.0,
    sellingPrice: 55.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1',
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Cold Coffee',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '835458c624d81702043422',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '8358c624d81702043422',
    barcodeID: null,
    name: 'Cold Coffee 4',
    mrp: 55.0,
    sellingPrice: 55.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1',
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Cold Coffee',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '835458c624d81702043422',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '835458c624d8143422',
    barcodeID: null,
    name: 'Cold Coffee 5',
    mrp: 55.0,
    sellingPrice: 55.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1',
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Cold Coffee',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '835458c624d81702043422',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '835458c1702043422',
    barcodeID: null,
    name: 'Cold Coffee 6',
    mrp: 55.0,
    sellingPrice: 55.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1', // Matches with "Other Food and Grocery"
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Cold Coffee',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '835458c624d81702043422',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '835458c6242043422',
    barcodeID: null,
    name: 'Cold Coffee',
    mrp: 55.0,
    sellingPrice: 55.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1', // Matches with "Other Food and Grocery"
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Cold Coffee',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '835458c624d81702043422',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '8354acc62c641766',
    barcodeID: null,
    name: 'Hot Chocolate',
    mrp: 45.0,
    sellingPrice: 45.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c1', // Matches with "Beverages"
    division: '49735092-3f7f-4a32-a89a-90514826391a',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Hot Chocolate',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/zbxt1h7DA2ApDuv.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '8354acc62c641702296566',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '83541ec84835612',
    barcodeID: null,
    name: 'Masala Corn1',
    mrp: 65.0,
    sellingPrice: 65.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c2', // Matches with "Snacks"
    division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Masala Corn',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '83541ec848fa1720435612',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '8358fa1720435610',
    barcodeID: null,
    name: 'Masala Corn2',
    mrp: 65.0,
    sellingPrice: 65.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c2', // Matches with "Snacks"
    division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Masala Corn',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '83541ec848fa1720435610',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '83541fa1720435611',
    barcodeID: null,
    name: 'Masala Corn3',
    mrp: 65.0,
    sellingPrice: 65.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c3', // Matches with "Snacks"
    division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Masala Corn',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '83541ec848fa1720435611',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '83541ec848fa1720435619',
    barcodeID: null,
    name: 'Masala Corn4',
    mrp: 65.0,
    sellingPrice: 65.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c3', // Matches with "Snacks"
    division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Masala Corn',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '83541ec848fa1720435619',
    variantsDimensions: [],
    shopId: 'shop-102',
  },
  {
    sku: '83541ec848fa1720435613',
    barcodeID: null,
    name: 'Masala Corn5',
    mrp: 65.0,
    sellingPrice: 65.0,
    deactivated: false,
    gst: null,
    hsn: null,
    category: 'c4', // Matches with "Snacks"
    division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
    subDivision: null,
    brand: null,
    productAttributes: [],
    asin: null,
    productDescription: 'Masala Corn',
    productImageUrl:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    uom: null,
    additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
    buyingOptions: {
      singlePurchase: {
        availability: {
          inStock: true,
          buyable: true,
          limitedStock: false,
          isBuyable: true,
        },
      },
    },
    secondaryImageUrl: null,
    secondaryImagesUrlToDelete: null,
    imagesUrlToDeleteFromS3: null,
    discount: 0,
    numberOfVariants: 1,
    currentStock: null,
    primaryProductId: '83541ec848fa1720435613',
    variantsDimensions: [],
    shopId: 'shop-102',
  },

  // Add more products as needed
];
