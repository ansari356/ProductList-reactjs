import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"; // Adjust the import path as necessary
const store = configureStore({
    reducer: {
        // Add your slices here
        // Example: cart: cartReducer,
        cart: cartReducer
    },
});
export default store; 
