import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const items = action.payload

            const existingItems = state.cartItems.find((p) => p.id === items.id);

            if (existingItems) {
                existingItems.quantity += 1;
                existingItems.totalPrice += items.price
            }

            else {
                state.cartItems.push({
                    ...items,
                    quantity: 1,
                    totalPrice: items.price
                })
            }

            state.totalQuantity += 1;
            state.totalPrice += items.price
        },

        removeFromCart: (state, action) => {
            const id = action.payload;

            const existingItem = state.cartItems.find((p) => p.id === id);

            if (!existingItem) return;

            state.totalQuantity -= 1;
            state.totalPrice -= existingItem.price;


            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id)
            }
            else {
                existingItem.quantity -= 1;
                existingItem.totalPrice -= existingItem.price;

            }
        },
        clearCart : (state , action) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
        }

    }
})

export const { addToCart, removeFromCart , clearCart } = cartSlice.actions
export default cartSlice.reducer