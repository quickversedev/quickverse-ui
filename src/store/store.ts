// src/redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
// import vendorListReducer from './slices/vendorListSlice';
// import VendorsSlice from '../services/VendorListSlice';
import VendorListSlice from '../services/VendorListSlice';
import FoodItemsSlice from '../services/FoodItemsSlice';
import PromoListSlice from '../services/promoListSlice';
import CampusBuzzListSlice from '../services/CampusBuzzListSlice';
import UserDetailsSlice from '../services/UserDetailsSlice';
import cartSlice from '../services/cartSlice';
// import laundryProducts from '../services/laundryProductsSlice';
import laundryProductsReducer from '../services/laundryProductsSlice';
import addressSlice from '../services/addressSclice';

const store = configureStore({
  reducer: {
    vendorList: VendorListSlice,
    foodItems: FoodItemsSlice,
    promoItems: PromoListSlice,
    campusBuzz: CampusBuzzListSlice,
    userDetails: UserDetailsSlice,
    cart: cartSlice,
    laundryProducts: laundryProductsReducer,
    address: addressSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
function addressReducer(state: unknown, action: UnknownAction): unknown {
  throw new Error('Function not implemented.');
}
