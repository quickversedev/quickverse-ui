import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../data/mockCategoriesData';
import { mockCategoriesData } from '../data/mockCategoriesData';
import { RootState } from '../store/store';

// Define the state interface
interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

// Initial state with mock data
const initialState: CategoryState = {
    categories: mockCategoriesData,
    loading: false,
    error: null,
};

// Helper function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Async thunk to fetch categories from an API with a 1-second delay
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            // Add a 1-second delay
            await delay(1000);

            const response = await fetch('https://api.example.com/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data: Category[] = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch categories');
        }
    }
);

// Category slice
export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoryLoading = (state: RootState) => state.categories.loading;
export const selectCategoryError = (state: RootState) => state.categories.error;

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
