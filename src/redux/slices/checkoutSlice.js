import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checkoutBill:{}
}

const checkoutSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    SAVE_BILL(state,action){
        state.checkoutBill = action.payload
    },
  }
});

export const {SAVE_BILL} = checkoutSlice.actions

export default checkoutSlice.reducer