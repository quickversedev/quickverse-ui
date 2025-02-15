// import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {RootState} from '../../store/store';
// import {getCart, getShopId, saveCart, saveShopId} from '../../utils/Storage';
// import {ProductCartItems} from '../../utils/canonicalModel';

// interface ProductCartState {
//   shopId: string;
//   productCart: ProductCartItems[];
// }

// const initialState: ProductCartState = {
//   shopId: getShopId(),
//   productCart: getCart(),
// };

// const productCartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToProductCart: (state, action: PayloadAction<ProductCartItems>) => {
//       if (
//         state.productCart.length === 0 ||
//         state.shopId === action.payload.shopId
//       ) {
//         if (state.productCart.length === 0) {
//           state.shopId = action.payload.shopId;
//           saveShopId(state.shopId);
//         }
//         state.productCart.push(action.payload);
//         console.log('state.productCart', action.payload);
//         saveCart(state.productCart);
//       } else {
//         console.warn(
//           'Cart contains items from another shop. Clear the cart before adding.',
//         );
//       }
//     },
//     removeFromProductCart: (state, action: PayloadAction<{id: string}>) => {
//       state.productCart = state.productCart.filter(
//         item => item.id !== action.payload.id,
//       );
//       if (state.productCart.length === 0) {
//         state.shopId = '';
//         saveShopId(state.shopId);
//       }
//       saveCart(state.productCart);
//     },
//     incrementProductQuantity: (state, action: PayloadAction<{id: string}>) => {
//       const item = state.productCart.find(
//         item => item.id === action.payload.id,
//       );
//       if (item) {
//         item.quantity += 1;
//       }
//       saveCart(state.productCart);
//     },
//     decrementProductQuantity: (state, action: PayloadAction<{id: string}>) => {
//       state.productCart = state.productCart.reduce<ProductCartItems[]>(
//         (acc, item) => {
//           if (item.id === action.payload.id) {
//             if (item.quantity > 1) {
//               acc.push({...item, quantity: item.quantity - 1});
//             }
//           } else {
//             acc.push(item);
//           }
//           return acc;
//         },
//         [],
//       );
//       if (state.productCart.length === 0) {
//         state.shopId = '';
//         saveShopId(state.shopId);
//       }
//       saveCart(state.productCart);
//     },
//     clearCart: state => {
//       state.productCart = [];
//       state.shopId = '';
//       saveShopId(state.shopId);
//       saveCart(state.productCart);
//     },
//   },
// });

// export const {
//   addToProductCart,
//   removeFromProductCart,
//   incrementProductQuantity,
//   decrementProductQuantity,
//   clearCart,
// } = productCartSlice.actions;

// export const selectCart = (state: RootState) => state.productCart.productCart;
// export const selectShopId = (state: RootState) => state.productCart.shopId;

// export default productCartSlice.reducer;

import {
  createSlice,
  Dispatch,
  PayloadAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {getCart, getShopId, saveCart, saveShopId} from '../../utils/Storage';
import {ProductCartItems} from '../../utils/canonicalModel';
import {addItemToCart} from './AddItemToCartService';
import {deleteItemFromCart} from './DeleteItemFromCart';
import {AppThunk} from '../../store/store'; // Assuming you have a Thunk type

interface ProductCartState {
  shopId: string;
  productCart: ProductCartItems[];
}

const initialState: ProductCartState = {
  shopId: getShopId() || '',
  productCart: getCart() || [],
};

const productCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToProductCart: (state, action: PayloadAction<ProductCartItems>) => {
      const {shopId} = action.payload;

      if (state.productCart.length > 0 && state.shopId !== shopId) {
        console.warn(
          'Cart contains items from another shop. Clear the cart before adding.',
        );
        return;
      }

      if (state.productCart.length === 0) {
        state.shopId = shopId;
        saveShopId(shopId);
      }

      state.productCart.push(action.payload);
      saveCart(state.productCart);
    },
    removeFromProductCart: (state, action: PayloadAction<{id: string}>) => {
      state.productCart = state.productCart.filter(
        item => item.id !== action.payload.id,
      );

      if (state.productCart.length === 0) {
        state.shopId = '';
        saveShopId('');
      }

      saveCart(state.productCart);
    },
    incrementProductQuantity: (state, action: PayloadAction<{id: string}>) => {
      const item = state.productCart.find(
        item => item.id === action.payload.id,
      );
      if (item) {
        item.quantity += 1;
        saveCart(state.productCart);
      }
    },
    decrementProductQuantity: (state, action: PayloadAction<{id: string}>) => {
      state.productCart = state.productCart.reduce<ProductCartItems[]>(
        (acc, item) => {
          if (item.id === action.payload.id && item.quantity > 1) {
            acc.push({...item, quantity: item.quantity - 1});
          } else if (item.id !== action.payload.id) {
            acc.push(item);
          }
          return acc;
        },
        [],
      );

      if (state.productCart.length === 0) {
        state.shopId = '';
        saveShopId('');
      }

      saveCart(state.productCart);
    },
    clearCart: state => {
      state.productCart = [];
      state.shopId = '';
      saveShopId('');
      saveCart([]);
    },
  },
});

// Thunk for adding an item to the cart
export const addToCart =
  (item: ProductCartItems, authData: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(productCartSlice.actions.addToProductCart(item));
      await addItemToCart(item.shopId, item.id, authData); // Replace '1234' with a dynamic value
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

// Thunk for removing an item from the cart
export const removeFromCart =
  (id: string, authData: string): AppThunk =>
  async (dispatch, getState) => {
    const {shopId} = getState().productCart;
    try {
      dispatch(productCartSlice.actions.removeFromProductCart({id}));
      await deleteItemFromCart(shopId, id, true, authData); // Replace '1234' with a dynamic value
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

// Thunk for incrementing product quantity
export const incrementQuantity =
  (id: string, authData: string): AppThunk =>
  async (dispatch, getState) => {
    const {shopId} = getState().productCart;
    try {
      dispatch(productCartSlice.actions.incrementProductQuantity({id}));
      await addItemToCart(shopId, id, authData); // Replace '1234' with a dynamic value
    } catch (error) {
      console.error('Failed to increment product quantity:', error);
    }
  };

// Thunk for decrementing product quantity
export const decrementQuantity =
  (id: string, authData: string): AppThunk =>
  async (dispatch, getState) => {
    const {shopId} = getState().productCart;
    try {
      dispatch(productCartSlice.actions.decrementProductQuantity({id}));
      await deleteItemFromCart(shopId, id, false, authData); // Replace '1234' with a dynamic value
    } catch (error) {
      console.error('Failed to decrement product quantity:', error);
    }
  };

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
