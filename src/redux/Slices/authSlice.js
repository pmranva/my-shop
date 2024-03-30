import {createSlice} from '@reduxjs/toolkit'
 
const authSlice=createSlice({
    name:'auth',
    initialState:{
        isLoggedIn:false,email:null,role:null,userName:null,userId:null
    },
    reducers:{
      userLogin(state,action){
        let{email,role,userName,userId}=action.payload
        state.isLoggedIn=true
        state.email=email
        state.role=role
        state.userName=userName
        state.userId=userId
      },
      userLogout(state,action){
        state.isLoggedIn=false
        state.email=null
        state.role=null
        state.userId=null
        state.userName=null

      }
    }
})
export const {userLogin,userLogout}=authSlice.actions
export default authSlice.reducer
export const selectIsLoggedIn=(state)=>state.auth.isLoggedIn
export const selectEmail=(state)=>state.auth.email
export const selectRole=(state)=>state.auth.role
export const selectUserName=(state)=>state.auth.userName
export const selectUserId=(state)=>state.auth.userId