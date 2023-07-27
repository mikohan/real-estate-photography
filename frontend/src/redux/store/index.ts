import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'redux/features/counterSlice';
import { ICounter } from 'redux/features/counterSlice';
import { pricesApi } from 'redux/services/pricesAPI';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export interface IState {
  counter: ICounter;
}
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pricesApi.reducerPath]: pricesApi.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([pricesApi.middleware])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
