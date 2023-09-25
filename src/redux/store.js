import { configureStore ,combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import filterReducer from './slices/filterProduct'
import cartReducer from './slices/cartSlice'
import checkoutReducer from './slices/checkoutSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
    bill:checkoutReducer
})
export const store = configureStore({
  reducer: rootReducer
})