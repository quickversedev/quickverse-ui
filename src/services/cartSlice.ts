import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {LaundryProduct} from '../utils/canonicalModel';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  ironRate: number;
  quantity: number;
  isIroningSelected: boolean;
  isWashingSelected: boolean;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<{id: string}>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action: PayloadAction<{id: string}>) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{id: string}>) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    updateCartItemServices: (state, action: PayloadAction<CartItem>) => {
      const item = state.cart.find(
        cartItem => cartItem.id === action.payload.id,
      );
      if (item) {
        item.isIroningSelected = action.payload.isIroningSelected;
        item.isWashingSelected = action.payload.isWashingSelected;
      }
    },
    clearCart: state => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateCartItemServices,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
