import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../data/mockProductData';
import { mockProductData } from '../data/mockProductData';

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: mockProductData,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
