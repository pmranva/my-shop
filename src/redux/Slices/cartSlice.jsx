import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
 name:'cart',
 initialState:{
    cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')):[],
    total: localStorage.getItem('total') ? localStorage.getItem('total'):0,
    previousURL:''},
 reducers:{
    ADD_TO_CART(state,action){
        console.log(action.payload)
        let productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
        if(productIndex == -1){
            state.cartItems.push({...action.payload,cartqty:1})
            toast.success(`${action.payload.name} added to cart`)
        }else{//increase
            if(state.cartItems[productIndex].cartqty < action.payload.qty){
                state.cartItems[productIndex].cartqty+=1
                toast.success(`${action.payload.name} qty increased by 1`)
            }else{
                toast.error(`${action.payload.qty} qty available`)
            }

        }
        localStorage.setItem('cartItem',JSON.stringify(state.cartItems))

    },
    DECREASE(state,action){
   let productIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
   if(state.cartItems[productIndex].cartqty > 1){
    state.cartItems[productIndex].cartqty -=1

   }else{
    state.cartItems[productIndex].cartqty = 1

   }
   localStorage.setItem('cartItem',JSON.stringify(state.cartItems))

    },
    REMOVE_FROM_CART(state,action){
     state.cartItems.splice(action.payload,1)
     localStorage.setItem('cartItem',JSON.stringify(state.cartItems))
    },
    EMPTY_CART(state,action){
     state.cartItems=[];
     localStorage.removeItem('cartItem')
    },
    CALCULATE_TOTAL(state,action){
     let t=state.cartItems.reduce((pre,item)=>{return  pre += item.price * item.cartqty},0)
     state.total=t
     localStorage.setItem('total',state.total)
    },
    SAVE_URL(state,action){
      state.previousURL=action.payload
    }
 }
})
export default cartSlice.reducer
export const {ADD_TO_CART,DECREASE,REMOVE_FROM_CART,EMPTY_CART,CALCULATE_TOTAL,SAVE_URL}=cartSlice.actions
export const selectCart=state=>state.cart.cartItems
export const selectTotal=state=>state.cart.total
export const selectURL=state=>state.cart.previousURL


