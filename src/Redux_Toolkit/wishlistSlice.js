import { createSlice } from "@reduxjs/toolkit";
import { removeFromCart } from "./cartSlice";

const initialState = {
    wishlist: [],
    status: null,
    totalQuantity : 0
}

const wishlistSlice = createSlice({
    name: "wishlistSlice",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {

            const existingItem = state.wishlist.find((item) => item.id === action.payload.id);

            if (!existingItem) {
                state.wishlist.push(action.payload)
            }

            state.totalQuantity = state.wishlist.length

        },
        removeFromWishlist : (state , action)=>{
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
            state.totalQuantity = state.wishlist.length

        },
        clearWishlist : (state , action) => {
            state.wishlist = [];
            state.totalQuantity = 0;
        }
    }
})

export const { addToWishlist , removeFromWishlist , clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer