import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { list } from 'firebase/storage';
import { toast } from 'react-toastify';

const fetchProducts = createAsyncThunk(
    'fetchproduct',
     async() =>{
        const product = await axios.get("https://6503cfbcc8869921ae242e2e.mockapi.io/product")
        return product.data
     }
  )

 const addProduct = createAsyncThunk(
    'addProduct', async(data) => {
        axios.post("https://6503cfbcc8869921ae242e2e.mockapi.io/product",data)
        .then(() =>{
            toast.success("Add successfully")
        })
    }
  )
  
  const deleteProduct = createAsyncThunk('deleteproduct',async(id) =>{
        axios.delete(`https://6503cfbcc8869921ae242e2e.mockapi.io/product/${id}`)
        .then(() =>{
            toast.success("Delete succesfully")
            window.location.reload(false);
        })   
  })

  

const initialState = {
    listProduct: [],
    minPrice: 0,
    maxPrice: 0
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    GET_RANGE_PRICE(state,action){
        const {data} = action.payload
        let arr = []
        data.map((item) => {
          return arr.push(item.price)
        })
        state.minPrice = Math.min(...arr)
        state.maxPrice = Math.max(...arr)
    }
    
  },
  extraReducers: {
    [fetchProducts.fulfilled] :(state,action) =>{
        state.listProduct = action.payload
    }
  }
  
  }
);



export default productsSlice.reducer;
export const {GET_RANGE_PRICE} = productsSlice.actions;
export {fetchProducts , addProduct, deleteProduct}