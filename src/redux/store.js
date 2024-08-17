import { blogApi } from './blogsFeatures/blogsApi';
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi';
import authReducer from './auth/authSlice'
import commentApi from './commentsFeatures/commentApi';



export const store = configureStore({
  reducer: {
  [blogApi.reducerPath] : blogApi.reducer,
  [authApi.reducerPath] : authApi.reducer,
  [commentApi.reducerPath] : commentApi.reducer,
  auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware,authApi.middleware,commentApi.middleware),
  
})

