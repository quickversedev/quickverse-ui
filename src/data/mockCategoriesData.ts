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
        id: "92c198b6-e13d-4410-8064-01903524b1b2",
        name: "Other Food and Grocery",
        description: "|",
        imageURLs: [
            "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/Icons-09.png"
        ],
        type: "MANAGED",
        parentCategory: null,
        countOfSkus: 1,
    },
    {
        id: "276eec3f-d65c-427a-b10d-4b9840056c53",
        name: "Bakery",
        description: "|",
        imageURLs: [
            "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/New_Bakery.png"
        ],
        type: "MANAGED",
        parentCategory: null,
        countOfSkus: 1,
    },
    {
        id: "67fb9b78-572e-46e1-a8f2-616312f364ed",
        name: "Instant Food",
        description: "|",
        imageURLs: [
            "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Instant_Food.png"
        ],
        type: "MANAGED",
        parentCategory: null,
        countOfSkus: 8,
    },
    {
        id: "6ba3ebf0-6997-46b8-ab48-3ea6a5d8710d",
        name: "Gourmet Food",
        description: "|",
        imageURLs: [
            "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Gourmet_Food.png"
        ],
        type: "MANAGED",
        parentCategory: null,
        countOfSkus: 35,
    },
    {
        id: "49735092-3f7f-4a32-a89a-90514826391a",
        name: "Beverages",
        description: "|",
        imageURLs: [
            "https://m.media-amazon.com/images/G/31/CONSTELLATION/Product_category_images/icons_New_Beverages.png"
        ],
        type: "MANAGED",
        parentCategory: null,
        countOfSkus: 8,
    },
    {
        id: "category2",
        name: "Beverages",
        description: "|",
        imageURLs: [
            "https://example.com/path/to/beverages_image.jpg"
        ],
        type: "MANAGED",
        parentCategory: null,
        countOfSkus: 1,
    },
    {
        id: "category3",
        name: "Snacks",
        description: "|",
        imageURLs: [
            "https://example.com/path/to/snacks_image.jpg"
        ],
        type: "MANAGED",
        parentCategory: null,
        countOfSkus: 1,
    },
];

// Exporting the mock data
export default mockCategoriesData;
