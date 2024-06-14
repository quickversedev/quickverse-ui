// src/redux/store.ts
import {configureStore} from '@reduxjs/toolkit';
// import vendorListReducer from './slices/vendorListSlice';
// import VendorsSlice from '../services/VendorListSlice';
import VendorListSlice from '../services/VendorListSlice';
import FoodItemsSlice from '../services/FoodItemsSlice';

const store = configureStore({
  reducer: {
    vendorList: VendorListSlice,
    foodItems: FoodItemsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
