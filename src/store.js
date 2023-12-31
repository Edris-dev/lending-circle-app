import { configureStore } from "@reduxjs/toolkit";
import authReducer from './components/Slices/authSlice';
import { apiSlice } from "./components/Slices/apiSlice";
const store = configureStore({
    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store;