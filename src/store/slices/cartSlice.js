import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({ 
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        // i want to add to cart and increase counter in cart icon
        // and also add the product to the cart

        addToCart: (state, action) => {

            const existingItem = state.items.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;

            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
        },
            // explain this :  
            // state.totalPrice += action.payload.price;
            // because we are adding the price of the product to the total price
            // and action.payload.price is the price of the product that we are adding to the cart
            // and state.totalPrice is the total price of all the products in the cart
            // and we are updating the total price of the cart
            // and we are also updating the total quantity of the cart

        addToCartByQuantity: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
                state.totalQuantity += action.payload.quantity;
                state.totalPrice += action.payload.price * action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity });
                state.totalQuantity += action.payload.quantity;
                state.totalPrice += action.payload.price * action.payload.quantity;     
            }        
        },



        removeFromCart: (state, action) => {

            const itemToRemove = state.items.find((item) => item.id === action.payload);
            if (itemToRemove) {
                state.totalQuantity -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
                state.items = state.items.filter((item) => item.id !== action.payload);
                // remove the item from the cart
                // and update the total quantity and total price
            }
        },


       
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },

        incrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += item.price;
                // if the quantity is greater than 1, just increase the quantity
                // and update the total quantity and total price
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                    // if the quantity is greater than 1, just decrease the quantity
                    // and update the total quantity and total price
                } else {
                    state.items = state.items.filter((item) => item.id !== action.payload);
                    state.totalQuantity -= 1;
                    state.totalPrice -= item.price;
                    // if the quantity is 1, remove the item from the cart
                    // and update the total quantity and total price 
                }
            }
        }
    
    },
});
export const { addToCart, removeFromCart, addToCartByQuantity, clearCart , incrementQuantity, decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;