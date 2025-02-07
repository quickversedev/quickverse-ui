import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {getCart, saveCart} from '../utils/Storage';
import {ProductCartItems} from '../utils/canonicalModel';

interface ProductCartState {
  shopId: string;
  productCart: ProductCartItems[];
}

const initialState: ProductCartState = {
  shopId: 'shop-101',
  productCart: getCart(),
  // productCart: [
  //   {
  //     id: '1',
  //     name: 'Margherita Pizza',
  //     price: 299,
  //     quantity: 2,

  //     image: 'https://example.com/margherita.jpg',
  //     shopId: 'shop-101',
  //   },
  //   {
  //     id: '2',
  //     name: 'Chicken Biryani',
  //     price: 450,
  //     quantity: 1,

  //     image: 'https://example.com/biryani.jpg',
  //     shopId: 'shop-101',
  //   },
  //   {
  //     id: '3',
  //     name: 'Veg Burger',
  //     price: 150,
  //     quantity: 3,

  //     image: 'https://example.com/vegburger.jpg',
  //     shopId: 'shop-101',
  //   },
  //   {
  //     id: '4',
  //     name: 'Pasta Alfredo',
  //     price: 350,
  //     quantity: 1,

  //     image: 'https://example.com/alfredo.jpg',
  //     shopId: 'shop-101',
  //   },
  //   {
  //     id: '5',
  //     name: 'Paneer Butter Masala',
  //     price: 400,
  //     quantity: 2,

  //     image: 'https://example.com/paneer.jpg',
  //     shopId: 'shop-101',
  //   },
  // ],
};

const productCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToProductCart: (state, action: PayloadAction<ProductCartItems>) => {
      if (
        state.productCart.length === 0 ||
        state.shopId === action.payload.shopId
      ) {
        if (state.productCart.length === 0) {
          state.shopId = action.payload.shopId;
        }
        state.productCart.push(action.payload);
        saveCart(state.productCart);
      } else {
        console.warn(
          'Cart contains items from another shop. Clear the cart before adding.',
        );
      }
    },
    removeFromProductCart: (state, action: PayloadAction<{id: string}>) => {
      state.productCart = state.productCart.filter(
        item => item.id !== action.payload.id,
      );
      if (state.productCart.length === 0) {
        state.shopId = '';
      }
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
          } else {
            acc.push(item);
          }
          return acc;
        },
        [],
      );
      if (state.productCart.length === 0) {
        state.shopId = '';
      }
      saveCart(state.productCart);
    },
    clearCart: state => {
      state.productCart = [];
      state.shopId = '';
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
export const selectShopId = (state: RootState) => state.productCart.shopId;

export default productCartSlice.reducer;
