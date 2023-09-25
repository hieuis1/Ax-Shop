import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false,
    email: null,
    userName: null,
    userId: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state,action)=>{
        const{email,userName,userId} = action.payload
        state.isLogin = true;
        state.email = email;
        state.userName = userName;
        state.userId = userId;
    },
    REMOVE_ACTIVE_USER: (state,action ) =>{
        state.isLogin = false;
        state.email = null;
        state.userName = null;
        state.userId = null;
    }
  }

});

export const { SET_ACTIVE_USER,REMOVE_ACTIVE_USER} = authSlice.actions
export const selectIsLogin = (state) => state.auth.isLogin
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserID = (state) => state.auth.userId



export default authSlice.reducer