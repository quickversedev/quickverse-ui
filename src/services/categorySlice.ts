import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store/store';

import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';
import {Category} from '../utils/canonicalModel';
import {mockCategoriesData} from '../data/mockCategoriesData';

// Define the state interface
interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// Initial state with mock data
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Async thunk to fetch categories from an API with a 1-second delay
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (vendorId: string) => {
    return new Promise<Category[]>(resolve => {
      setTimeout(() => {
        console.log('vendorId to fetch Categories mock:', vendorId);
        resolve(mockCategoriesData);
      }, 1000);
    });
  },
);
// const API_BASE_URL = `${globalConfig.apiBaseUrl}/v2/campus`;

// export const fetchCategories = createAsyncThunk(
//   'categories/fetchCategories',
//   async ({vendorId}: {vendorId: string}, {rejectWithValue}) => {
//     try {
//       const token = await fetchToken();
//       const response = await axios.get<Category[]>(
//         `${API_BASE_URL}/${vendorId}/category`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//       return rejectWithValue('Failed to fetch products');
//     }
//   },
// );

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectCategoryLoading = (state: RootState) =>
  state.categories.loading;
export const selectCategoryError = (state: RootState) => state.categories.error;

export const {setCategories} = categorySlice.actions;
export default categorySlice.reducer;
