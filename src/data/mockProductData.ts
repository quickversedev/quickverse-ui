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

// export interface Product {
//   sku: string;
//   barcodeID: string | null;
//   name: string;
//   mrp: number;
//   sellingPrice: number;
//   deactivated: boolean;
//   gst: number | null;
//   hsn: string | null;
//   category: string;
//   division: string;
//   subDivision: string | null;
//   brand: string | null;
//   productAttributes: string[];
//   asin: string | null;
//   productDescription: string;
//   productImageUrl: string;
//   uom: string | null;
//   additionalAttributes: string;
//   buyingOptions: BuyingOptions;
//   secondaryImageUrl: string | null;
//   secondaryImagesUrlToDelete: string | null;
//   imagesUrlToDeleteFromS3: string | null;
//   discount: number;
//   numberOfVariants: number;
//   currentStock: number | null;
//   primaryProductId: string;
//   variantsDimensions: string[];
//   shopId: string;
// }

// // Mock product data
// export const mockProductData: Product[] = [
//   {
//     sku: '835458c624d81702043422',
//     barcodeID: null,
//     name: 'Cold Coffee 1',
//     mrp: 55.0,
//     sellingPrice: 55.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1',
//     division: '49735092-3f7f-4a32-a89a-90514826391a',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Cold Coffee',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '835458c624d81702043422',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '835458c624d81702422',
//     barcodeID: null,
//     name: 'Cold Coffee 2',
//     mrp: 55.0,
//     sellingPrice: 55.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1',
//     division: 'c1',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Cold Coffee',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '835458c624d81702043422',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '83545824d81702043422',
//     barcodeID: null,
//     name: 'Cold Coffee 3',
//     mrp: 55.0,
//     sellingPrice: 55.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1',
//     division: 'c1',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Cold Coffee',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '835458c624d81702043422',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '8358c624d81702043422',
//     barcodeID: null,
//     name: 'Cold Coffee 4',
//     mrp: 55.0,
//     sellingPrice: 55.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1',
//     division: '49735092-3f7f-4a32-a89a-90514826391a',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Cold Coffee',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '835458c624d81702043422',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '835458c624d8143422',
//     barcodeID: null,
//     name: 'Cold Coffee 5',
//     mrp: 55.0,
//     sellingPrice: 55.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1',
//     division: '49735092-3f7f-4a32-a89a-90514826391a',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Cold Coffee',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '835458c624d81702043422',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '835458c1702043422',
//     barcodeID: null,
//     name: 'Cold Coffee 6',
//     mrp: 55.0,
//     sellingPrice: 55.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1', // Matches with "Other Food and Grocery"
//     division: '49735092-3f7f-4a32-a89a-90514826391a',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Cold Coffee',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '835458c624d81702043422',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '835458c6242043422',
//     barcodeID: null,
//     name: 'Cold Coffee',
//     mrp: 55.0,
//     sellingPrice: 55.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1', // Matches with "Other Food and Grocery"
//     division: '49735092-3f7f-4a32-a89a-90514826391a',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Cold Coffee',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '835458c624d81702043422',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '8354acc62c641766',
//     barcodeID: null,
//     name: 'Hot Chocolate',
//     mrp: 45.0,
//     sellingPrice: 45.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c1', // Matches with "Beverages"
//     division: '49735092-3f7f-4a32-a89a-90514826391a',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Hot Chocolate',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/zbxt1h7DA2ApDuv.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '8354acc62c641702296566',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '83541ec84835612',
//     barcodeID: null,
//     name: 'Masala Corn1',
//     mrp: 65.0,
//     sellingPrice: 65.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c2', // Matches with "Snacks"
//     division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Masala Corn',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '83541ec848fa1720435612',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '8358fa1720435610',
//     barcodeID: null,
//     name: 'Masala Corn2',
//     mrp: 65.0,
//     sellingPrice: 65.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c2', // Matches with "Snacks"
//     division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Masala Corn',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '83541ec848fa1720435610',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '83541fa1720435611',
//     barcodeID: null,
//     name: 'Masala Corn3',
//     mrp: 65.0,
//     sellingPrice: 65.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c3', // Matches with "Snacks"
//     division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Masala Corn',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '83541ec848fa1720435611',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '83541ec848fa1720435619',
//     barcodeID: null,
//     name: 'Masala Corn4',
//     mrp: 65.0,
//     sellingPrice: 65.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c3', // Matches with "Snacks"
//     division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Masala Corn',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '83541ec848fa1720435619',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },
//   {
//     sku: '83541ec848fa1720435613',
//     barcodeID: null,
//     name: 'Masala Corn5',
//     mrp: 65.0,
//     sellingPrice: 65.0,
//     deactivated: false,
//     gst: null,
//     hsn: null,
//     category: 'c4', // Matches with "Snacks"
//     division: '6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d',
//     subDivision: null,
//     brand: null,
//     productAttributes: [],
//     asin: null,
//     productDescription: 'Masala Corn',
//     productImageUrl:
//       'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
//     uom: null,
//     additionalAttributes: '{"isOOS": false, "isBestSeller": true}',
//     buyingOptions: {
//       singlePurchase: {
//         availability: {
//           inStock: true,
//           buyable: true,
//           limitedStock: false,
//           isBuyable: true,
//         },
//       },
//     },
//     secondaryImageUrl: null,
//     secondaryImagesUrlToDelete: null,
//     imagesUrlToDeleteFromS3: null,
//     discount: 0,
//     numberOfVariants: 1,
//     currentStock: null,
//     primaryProductId: '83541ec848fa1720435613',
//     variantsDimensions: [],
//     shopId: 'IIMU-005',
//   },

//   // Add more products as needed
// ];

export interface Product {
  productId: string;
  vendorId: string;
  shopId: string;
  title: string;
  description: string;
  availability: string;
  condition: string;
  productPrice: string;
  productSalePrice: string;
  productLink: string;
  productImageLink: string;
  productBrand: string;
  productSize: string;
  category: string;
}

export const mockProductData: Product[] = [
  {
    productId: 'P12345',
    vendorId: 'V001',
    shopId: 'S001',
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound, noise-canceling, comfortable ear cups.',
    availability: 'In Stock',
    condition: 'New',
    productPrice: '120.00',
    productSalePrice: '100.00',
    productLink: 'https://example.com/product/P12345',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'AudioPro',
    productSize: 'Medium',
    category: 'Electronics',
  },
  {
    productId: 'P67890',
    vendorId: 'V001',
    shopId: 'S002',
    title: 'Smartphone XYZ',
    description:
      'Latest model with high-performance features and sleek design.',
    availability: 'In Stock',
    condition: 'New',
    productPrice: '799.00',
    productSalePrice: '699.00',
    productLink: 'https://example.com/product/P67890',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'TechBrand',
    productSize: '6.5-inch',
    category: 'Mobile Phones',
  },
  {
    productId: 'P54321',
    vendorId: 'V001',
    shopId: 'S001',
    title: 'Gaming Laptop G15',
    description:
      'Powerful gaming laptop with RTX graphics and high refresh rate display.',
    availability: 'Out of Stock',
    condition: 'New',
    productPrice: '1500.00',
    productSalePrice: '1350.00',
    productLink: 'https://example.com/product/P54321',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'GamePro',
    productSize: '15.6-inch',
    category: 'Laptops',
  },
  {
    productId: 'P78901',
    vendorId: 'V001',
    shopId: 'S001',
    title: 'Smartwatch X-Series',
    description:
      'Stylish smartwatch with fitness tracking and notification features.',
    availability: 'In Stock',
    condition: 'New',
    productPrice: '199.00',
    productSalePrice: '179.00',
    productLink: 'https://example.com/product/P78901',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'WatchTech',
    productSize: 'One Size',
    category: 'Wearables',
  },
  {
    productId: 'P65432',
    vendorId: 'V001',
    shopId: 'S001',
    title: 'Wireless Keyboard & Mouse Combo',
    description:
      'Ergonomic design, long battery life, and seamless connectivity.',
    availability: 'In Stock',
    condition: 'New',
    productPrice: '59.00',
    productSalePrice: '49.00',
    productLink: 'https://example.com/product/P65432',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'PeriTech',
    productSize: 'Standard',
    category: 'Computer Accessories',
  },
  {
    productId: 'P98765',
    vendorId: 'V001',
    shopId: 'S001',
    title: 'Noise-Canceling Earbuds',
    description: 'Compact, high-quality sound with active noise cancelation.',
    availability: 'In Stock',
    condition: 'New',
    productPrice: '149.00',
    productSalePrice: '129.00',
    productLink: 'https://example.com/product/P98765',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'SoundElite',
    productSize: 'Small',
    category: 'Computer Accessories',
  },
  {
    productId: 'P45678',
    vendorId: 'V001',
    shopId: 'S001',
    title: 'Ultra-HD 4K TV',
    description:
      'Smart TV with crisp visuals, HDR, and built-in streaming apps.',
    availability: 'Limited Stock',
    condition: 'New',
    productPrice: '1200.00',
    productSalePrice: '999.00',
    productLink: 'https://example.com/product/P45678',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'VisionX',
    productSize: '55-inch',
    category: 'Computer Accessories',
  },
  {
    productId: 'P32109',
    vendorId: 'V001',
    shopId: 'S001',
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof, high-bass, and 10-hour battery life.',
    availability: 'Out of Stock',
    condition: 'New',
    productPrice: '79.00',
    productSalePrice: '69.00',
    productLink: 'https://example.com/product/P32109',
    productImageLink:
      'https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg',
    productBrand: 'BoomBox',
    productSize: 'Small',
    category: 'Computer Accessories',
  },
];
