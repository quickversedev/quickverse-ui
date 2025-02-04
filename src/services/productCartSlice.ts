import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {getCart, saveCart} from '../utils/Storage';

export interface ProductCartItems {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
  image: string;
}

interface ProductCartState {
  productCart: ProductCartItems[];
}

const initialState: ProductCartState = {
  productCart: getCart(),
};

const productCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToProductCart: (state, action: PayloadAction<ProductCartItems>) => {
      state.productCart.push(action.payload);
      saveCart(state.productCart);
    },
    removeFromProductCart: (state, action: PayloadAction<{id: string}>) => {
      state.productCart = state.productCart.filter(
        item => item.id !== action.payload.id,
      );
      saveCart(state.productCart);
    },
    incrementProductQuantity: (state, action: PayloadAction<{id: string}>) => {
      const item = state.productCart.find(
        item => item.id === action.payload.id,
      );
      if (item) {
        item.quantity += 1;
      }
      saveCart(state.productCart);
    },
    decrementProductQuantity: (state, action: PayloadAction<{id: string}>) => {
      state.productCart = state.productCart.reduce<ProductCartItems[]>(
        (acc, item) => {
          if (item.id === action.payload.id) {
            if (item.quantity > 1) {
              acc.push({...item, quantity: item.quantity - 1});
            }
            // If quantity is 1, item is removed by not pushing it to the new array
          } else {
            acc.push(item);
          }
          return acc;
        },
        [],
      );
      saveCart(state.productCart);
    },
    clearCart: state => {
      state.productCart = [];
      saveCart(state.productCart);
    },
  },
});

export const {
  addToProductCart,
  removeFromProductCart,
  incrementProductQuantity,
  decrementProductQuantity,
  clearCart,
} = productCartSlice.actions;

export const selectCart = (state: RootState) => state.productCart.productCart;

export default productCartSlice.reducer;
