import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice"
import authReducer from "./authSlice"

const loadFormLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("reduxState");
        if(serializedState === null) return undefined;

        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const saveData = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState" , serializedState);
    } catch (error) {
        console.log(error);
    }
}

const preloadedState = loadFormLocalStorage();

const store = configureStore({
    reducer : {
        products : productReducer,
        cart : cartReducer,
        wishlist : wishlistReducer,
        auth:authReducer,
    }, 
    preloadedState
})

store.subscribe(() => {
    saveData({
        cart:store.getState().cart,
        wishlist:store.getState().wishlist
    })
})

export default store