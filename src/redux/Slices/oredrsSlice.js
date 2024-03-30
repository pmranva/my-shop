import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
  name:'order',
  initialState:{orders:[]},
  reducers:{
    store_orders(state,action){
        state.orders=action.payload
    }
  }
})
export default orderSlice.reducer
export const {store_orders}=orderSlice.actions
export const selectorder=(state)=> state.order.orders