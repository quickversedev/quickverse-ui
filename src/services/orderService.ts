// services/orderService.ts

import axios from 'axios';
import {CartItem} from './cartSlice';
import {Address} from '../utils/canonicalModel';

interface OrderRequest {
  cartItems: CartItem[];
  address: Address;
  totals: {
    washingTotal: number;
    ironingTotal: number;
    finalTotal: number;
  };
}

export const placeOrder = async (orderDetails: OrderRequest) => {
  try {
    console.log('placinfg order');
    const response = await axios.post(
      'https://your-api-endpoint/orders',
      orderDetails,
    );
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};
