import { blogApi } from './blogsFeatures/blogsApi';
import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
  reducer: {
  [blogApi.reducerPath] : blogApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
  
})

