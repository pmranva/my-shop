import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
  name:'product',
  initialState:{products:[]},
  reducers:{
    store_products(state,action){
        state.products=action.payload
    }
  }
})
export default productSlice.reducer
export const {store_products}=productSlice.actions
export const selectProduct=(state)=> state.product.products