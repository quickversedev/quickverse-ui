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

// Import the new slices for categories and products
import categoriesSlice from '../services/categorySlice';  // New categories slice
import productsSlice from '../services/productsSlice';  // New products slice

const store = configureStore({
  reducer: {
    // Existing reducers
    vendorList: VendorListSlice,
    foodItems: FoodItemsSlice,
    promoItems: PromoListSlice,
    campusBuzz: CampusBuzzListSlice,
    userDetails: UserDetailsSlice,
    cart: cartSlice,
    laundryProducts: laundryProductsReducer,
    address: addressSlice,

    // New reducers for categories and products
    categories: categoriesSlice,
    products: productsSlice,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
