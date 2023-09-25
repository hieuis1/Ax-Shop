import { createSlice } from '@reduxjs/toolkit'
import { list } from 'firebase/storage';
import { json } from 'react-router-dom';
import { toast } from 'react-toastify';


const initialState = {
    listCarts : localStorage.getItem('cartItem')? JSON.parse(localStorage.getItem("cartItem")) : [],
    quantity: 0,
    total : 0,
    previusURL:'',
    headerQuantity:0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state,action){
        let index = state.listCarts.findIndex((product) => product.id == action.payload.id)
        if(index >= 0){
            state.listCarts[index].quantity += 1;
            toast.success("Increase product quantity...",{
              position: toast.POSITION.TOP_LEFT
            })
            state.headerQuantity += 1;
        }
        else{
            let tempProduct = {...action.payload , quantity : 1}
            state.listCarts.push(tempProduct)
            toast.success("Product has add to cart.",{
              position: toast.POSITION.TOP_LEFT
            })
            state.headerQuantity += 1;
        }
        localStorage.setItem("cartItem",JSON.stringify(state.listCarts))
    },
    INCREASE_QUANTITY(state,action){
      let index = state.listCarts.findIndex((item => item.id === action.payload.id))
      state.listCarts[index].quantity += 1;
      state.headerQuantity += 1
      localStorage.setItem('cartItem',JSON.stringify(state.listCarts))
    },
    DECREASE_QUANTITY(state,action){
      let index = state.listCarts.findIndex(item => item.id === action.payload.id)
      if(index >= 0){
        state.listCarts[index].quantity -= 1
        if(state.listCarts[index].quantity == 0){
          let newData = state.listCarts.filter(item => item.id !== action.payload.id )
          state.listCarts = newData
        }
      }
      state.headerQuantity -= 1
      localStorage.setItem('cartItem',JSON.stringify(state.listCarts))
    },
    CLEAR_CART(state,action){
      state.listCarts = []
      state.headerQuantity = 0
      localStorage.setItem('cartItem',JSON.stringify(state.listCarts))
    },
    TOTAL_QUANTITY(state,action){
        let sum =0;
      state.listCarts.forEach(element => {
        sum += element.quantity
      });
      state.quantity = sum;
    },
    TOTAL_PRICE(state,action){
      let sum =0;
      state.listCarts.forEach((item) =>{
        sum += item.price * item.quantity;
      })
      state.total = sum;
    },
    ADD_FROM_DETAIL(state,action){
      const {product, quantity} = action.payload;
      console.log(product.id);
      let index = state.listCarts.findIndex(item => item.id === product.id)
      if(index <0){
        let newData = {...product,quantity:quantity}
        state.listCarts.push(newData)
        toast.success("add to cart ...",{
          position: toast.POSITION.TOP_LEFT
        })
        state.headerQuantity += quantity;
      }
      else{
        state.listCarts[index].quantity += quantity
        toast.success("Increase product quantity..",{
          position: toast.POSITION.TOP_LEFT
        })
        state.headerQuantity += quantity
      }

      localStorage.setItem('cartItem',JSON.stringify(state.listCarts))
    },
    DELETE_PRODUCT(state,action){
      let newData = state.listCarts.filter(item => item.id !== action.payload.id)
      state.listCarts = newData;
      state.headerQuantity -= action.payload.quantity
      localStorage.setItem('cartItem',JSON.stringify(state.listCarts))
    },
    SET_PREV_URL(state,action){
      state.previusURL = action.payload
    },
    
  }
});

export const {ADD_TO_CART,INCREASE_QUANTITY,DECREASE_QUANTITY,CLEAR_CART,TOTAL_QUANTITY,TOTAL_PRICE,ADD_FROM_DETAIL, DELETE_PRODUCT,SET_PREV_URL} = cartSlice.actions

export default cartSlice.reducer