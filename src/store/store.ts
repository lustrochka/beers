import { configureStore } from '@reduxjs/toolkit';
import selectedSlice from './slices/selectedSlice';
import objectsSlice from './slices/objectsSlice';
import isLoadingSlice from './slices/isLoadingSlice';
import totalSlice from './slices/totalSlice';
import { API } from '../api/api';

export const store = configureStore({
  reducer: {
    objects: objectsSlice,
    selected: selectedSlice,
    isLoading: isLoadingSlice,
    total: totalSlice,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
