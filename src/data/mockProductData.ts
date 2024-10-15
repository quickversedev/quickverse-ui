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
}

// Mock product data
export const mockProductData: Product[] = [
    {
        sku: "835458c624d81702043422",
        barcodeID: null,
        name: "Cold Coffee",
        mrp: 55.0,
        sellingPrice: 55.0,
        deactivated: false,
        gst: null,
        hsn: null,
        category: "92c198b6-e13d-4410-8064-01903524b1b2", // Matches with "Other Food and Grocery"
        division: "49735092-3f7f-4a32-a89a-90514826391a",
        subDivision: null,
        brand: null,
        productAttributes: [],
        asin: null,
        productDescription: "Cold Coffee",
        productImageUrl: "https://m.media-amazon.com/images/X/bxt1/M/Xbxt1BpzAXWsaho.jpg",
        uom: null,
        additionalAttributes: "{\"isOOS\": false, \"isBestSeller\": true}",
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
        primaryProductId: "835458c624d81702043422",
        variantsDimensions: [],
    },
    {
        sku: "8354acc62c641702296564",
        barcodeID: null,
        name: "Hot Chocolate",
        mrp: 45.0,
        sellingPrice: 45.0,
        deactivated: false,
        gst: null,
        hsn: null,
        category: "category2", // Matches with "Beverages"
        division: "49735092-3f7f-4a32-a89a-90514826391a",
        subDivision: null,
        brand: null,
        productAttributes: [],
        asin: null,
        productDescription: "Hot Chocolate",
        productImageUrl: "https://m.media-amazon.com/images/X/bxt1/M/zbxt1h7DA2ApDuv.jpg",
        uom: null,
        additionalAttributes: "{\"isOOS\": false, \"isBestSeller\": true}",
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
        primaryProductId: "8354acc62c641702296564",
        variantsDimensions: [],
    },
    {
        sku: "83541ec848fa1720435612",
        barcodeID: null,
        name: "Masala Corn",
        mrp: 65.0,
        sellingPrice: 65.0,
        deactivated: false,
        gst: null,
        hsn: null,
        category: "category3", // Matches with "Snacks"
        division: "6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d",
        subDivision: null,
        brand: null,
        productAttributes: [],
        asin: null,
        productDescription: "Masala Corn",
        productImageUrl: "https://m.media-amazon.com/images/X/bxt1/M/Nbxt1RAImJCQ$CY.jpg",
        uom: null,
        additionalAttributes: "{\"isOOS\": false, \"isBestSeller\": true}",
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
        primaryProductId: "83541ec848fa1720435612",
        variantsDimensions: [],
    },
    
    // Add more products as needed
];
