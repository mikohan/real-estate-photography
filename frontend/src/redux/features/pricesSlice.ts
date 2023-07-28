import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { pricesApi, useGetPricesQuery } from 'redux/services/pricesAPI';

// First, create the thunk
const fetchUserById = createAsyncThunk('users/fetchByIdStatus', async (userId, thunkAPI) => {
  const response = await pricesApi.useGetPricesQuery;
  return response.arguments;
});

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'prices',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    // builder.addCase(useGetPricesQuery, (state, action) => {
    //   // Add user to the state array
    //   state.entities.push(action.payload);
    // });
  }
});

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123));
