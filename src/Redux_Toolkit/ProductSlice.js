import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "fetchProducts" , 
    async () => {
        let res = await fetch("https://dummyjson.com/products")
        let data =await res.json();
        return data.products;
    }
)

export const fetchCatagoriesProducts = createAsyncThunk(
    "fetchCatagoriesProducts", 
    async (catagory) => {
        let res = await fetch(`https://dummyjson.com/products/category/${catagory}`)
        let data =await res.json();
        return data.products;
    }
)

export const fetchProductDetails = createAsyncThunk(
    "fetchProductDetails", 
    async (id) => {
        let res = await fetch(`https://dummyjson.com/products/${id}`)
        let data =await res.json();
        return data;
    }
)


const initialState = {
    items : [],
    productDetails:null,
    status : "idle",
}

const productSlice = createSlice({
    name :"productSlice" , 
    initialState , 
    reducers : {},
    extraReducers : (builder) => {
        builder 
        .addCase(fetchProducts.fulfilled , (state , action) => {
            state.status = "success" ;
            state.items = action.payload
        })
        .addCase(fetchProducts.pending , (state , action) => {
            state.status = "loading"
            state.items = [];
        })
        .addCase(fetchProducts.rejected , (state , action) => {
            state.status = "failed"
        })
        .addCase(fetchCatagoriesProducts.fulfilled , (state , action) => {
            state.status = "success";
            state.items = action.payload
        })
        .addCase(fetchCatagoriesProducts.pending , (state , action) => {
            state.status = "pending"
            state.items = []
        })
        .addCase(fetchCatagoriesProducts.rejected , (state , action) => {
            state.status = "failed"
        })
        .addCase(fetchProductDetails.fulfilled , (state , action) => {
            state.status = "success";
            state.productDetails = action.payload
        })
        .addCase(fetchProductDetails.pending , (state , action) => {
            state.status = "pending";
            state.productDetails = null
        })
        .addCase(fetchProductDetails.rejected , (state , action) => {
            state.status = "failed";
            state.productDetails = null
        })
    }
})

export default productSlice.reducer