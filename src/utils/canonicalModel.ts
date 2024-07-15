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
  id: string;
  name: string;
  image: any; //base64
  description: string;
  link: string;
}
export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: string;
}
export interface FoodItem {
  id: string;
  name?: string;
  image?: any; //base64
  description?: string;
  link?: string;
}
export interface Buzz {
  id: string;
  image?: any; //base64
  link: string;
}
export interface CampusBuzz {
  buzzEnabled: boolean;
  buzzList: Buzz[];
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
