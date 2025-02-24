import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {getCart, getShopId, saveCart, saveShopId} from '../../utils/Storage';
import {ProductCartItems} from '../../utils/canonicalModel';
import {addItemToCart} from './AddItemToCartService';
import {deleteItemFromCart} from './DeleteItemFromCart';
import {AppThunk} from '../../store/store';

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
      const {vendorId} = action.payload;
      console.log('[25]', action.payload);
      if (state.productCart.length > 0 && state.shopId !== vendorId) {
        console.warn(
          'Cart contains items from another shop. Clear the cart before adding.',
        );
        return;
      }

      if (state.productCart.length === 0) {
        state.shopId = vendorId;
        console.log('[35]', vendorId);
        saveShopId(vendorId);
      }

      state.productCart.push(action.payload);
      console.log('[40]', typeof state.productCart);
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

export const addToCart =
  (item: ProductCartItems, authData: string): AppThunk =>
  async dispatch => {
    try {
      await addItemToCart(item.vendorId, item.id, authData);
      dispatch(productCartSlice.actions.addToProductCart(item));
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

export const removeFromCart =
  (id: string, authData: string): AppThunk =>
  async (dispatch, getState) => {
    const {shopId} = getState().productCart;
    try {
      await deleteItemFromCart(shopId, id, true, authData);
      dispatch(productCartSlice.actions.removeFromProductCart({id}));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

export const incrementQuantity =
  (id: string, authData: string): AppThunk =>
  async (dispatch, getState) => {
    const {shopId} = getState().productCart;
    try {
      await addItemToCart(shopId, id, authData);
      dispatch(productCartSlice.actions.incrementProductQuantity({id}));
    } catch (error) {
      console.error('Failed to increment product quantity:', error);
    }
  };

export const decrementQuantity =
  (id: string, authData: string): AppThunk =>
  async (dispatch, getState) => {
    const {shopId} = getState().productCart;
    try {
      await deleteItemFromCart(shopId, id, false, authData);
      dispatch(productCartSlice.actions.decrementProductQuantity({id}));
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
