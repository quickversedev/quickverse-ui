import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../data/mockCategoriesData';
import { mockCategoriesData } from '../data/mockCategoriesData';

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: mockCategoriesData,
};

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
