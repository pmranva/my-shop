import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import productSlice from "./Slices/productSlice";
import UsersSlice from "./Slices/UsersSlice";
import cartSlice from "./Slices/cartSlice";
import checkoutSlice from "./Slices/checkoutSlice";
import oredrSlice from "./Slices/oredrsSlice";
import filterSlice from "./Slices/filterSlice";

 const store=configureStore({
    reducer:{
        auth:authSlice,
        product:productSlice,
        user:UsersSlice,
        cart:cartSlice,
        checkout:checkoutSlice,
        order:oredrSlice,
        filter:filterSlice,
        
    }
})
export default store;