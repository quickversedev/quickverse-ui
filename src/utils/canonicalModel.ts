export interface Vendor {
  vendorId: string;
  vendorName: string;
  vendorBanner: string; //base64
  storeDescription: string;
  distance: string;
  vendorEndPoint: string;
  storeEnabled: boolean;
  vendorOwner: string;
  vendorPhone: string;
  storeOpeningTime: string;
  storeClosingTime: string;
  storeCategory: string;
}
export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: string;
}
export interface FoodItem {
  itemId: string;
  itemName?: string;
  itemImage?: any; //base64
  itemDesc?: string;
  itemLink?: string;
}
export interface CampusBuzz {
  buzzId: string;
  campusId: string;
  buzzName: string;
  buzzDescription: string;
  buzzUrl?: string;
  buzzImage: string;
  endDate: string;
}
export interface Campus {
  campusId: string;
  campusName: string;
  location: string;
  vendors?: {} | undefined;
}
export interface User {
  mobile: string;
  campusId: string;
  userName: string;
  pin: string;
  emailId: string;
  verifyEmail: false;
  createdDate: string;
  addresses: Address[];
}
// export interface Address {
//   id: number;
//   streetAddress: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// }
export interface config {
  configuration: any;
}

export interface LaundryProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  category: string;
  available: boolean;
  imageUrl: string;
  ironRate: number;
}
export interface Address {
  keyId: string;
  address: {
    name: string;
    phone: string;
    concatenatedAddress: string;
  };
}
// Define the OrderMetadata interface
export interface OrderMetadata {
  orderId: string;
  customerId: string;
  customerName: string;
  customerMobileNumber: string;
  customerDeliveryAddress: string | null;
  state: string;
  totalOrderAmount: number;
  totalItemCount: number;
  totalProductCount: number;
  totalInvoiceAmount: number;
  fulfillmentOption: string;
  creationTime: string;
  productImageUrls: string[];
  stateLabel: string;
  orderDescription: string;
  orderLink: string;
}

// Define the Cursor interface
export interface Cursor {
  orderId: string;
  customerId: string;
  platform: string;
}

// Define the OrdersResponse interface
export interface OrdersResponse {
  ordersMetadata: OrderMetadata[];
  cursor: Cursor | null;
}
export interface ProductCartItems {
  id: string;
  name: string;
  productPrice: string;
  salePrice: string;
  quantity: number;
  image: string;
  shopId: string;
}

export interface Promo {
  vendorId: string;
  campusId: string;
  promoId: number;
  promoImage: string;
  promoLink: string;
  promoName: string;
}

export interface Product {
  productId: string;
  vendorId: string;
  shopId: string;
  title: string;
  description: string;
  availability: boolean;
  condition: string;
  productPrice: string;
  productSalePrice: string;
  productImageLink: string;
  productBrand: string;
  productSize: string;
  category: string;
  isBestSeller: boolean;
}
export interface Category {
  id: string;
  name: string;
  description: string;
  imageURLs: string[];
  type: string;
  parentCategory: string | null;
  countOfSkus: number;
}
