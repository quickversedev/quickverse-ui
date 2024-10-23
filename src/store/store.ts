// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';

// Import existing slices
import VendorListSlice from '../services/VendorListSlice';
import FoodItemsSlice from '../services/FoodItemsSlice';
import PromoListSlice from '../services/promoListSlice';
import CampusBuzzListSlice from '../services/CampusBuzzListSlice';
import UserDetailsSlice from '../services/UserDetailsSlice';
import cartSlice from '../services/cartSlice';
import laundryProductsReducer from '../services/laundryProductsSlice';
import addressSlice from '../services/addressSclice';
import categoriesSlice from '../services/categorySlice';  
import productsSlice from '../services/productsSlice';  

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
    categories: categoriesSlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
