export interface VenderList {
  vendorId: string;
  vendorName: string;
  vendorBanner: string; //base64
  description: string;
  distance: string;
  vendorEndPoint: string;
  storeEnabled: boolean;
  vendorOwner: string;
  vendorPhone: string;
  storeOpeningTime: string;
  storeClosingTime: string;
}
export interface Promo {
  promoId: string;
  promoName: string;
  promoImage: any; //base64
  promoLink: string;
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
export interface Address {
  id: number;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
