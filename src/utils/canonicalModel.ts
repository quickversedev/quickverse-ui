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
