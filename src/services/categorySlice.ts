// src/redux/slices/categoriesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../data/mockCategoriesData'; // Import your Category type
import mockCategoriesData from '../data/mockCategoriesData'; // Import mocked categories data

// Simulating an API call with a delay
export const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetchCategories',
  async () => {
    return new Promise<Category[]>(resolve => {
      setTimeout(() => {
        resolve(mockCategoriesData); // Resolve with mocked data
      }, 1000); // 1 second delay
    });
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    addCategory: (state, action: { payload: Category }) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: { payload: string }) => { // Ensure the type matches your Category ID type
      state.categories = state.categories.filter(
        category => category.id !== action.payload // Compare with the correct type
      );
    },
    updateCategory: (state, action: { payload: Category }) => {
      const index = state.categories.findIndex(
        category => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload; // Update the category
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Populate categories with fetched data
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { addCategory, removeCategory, updateCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
