import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filterProduct :[]
}

const filterProduct = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state,action) {
        const{products ,search} = action.payload
        if(search != ""){
            const newData = products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            state.filterProduct = newData
        }
        else{
            state.filterProduct = products
        }
    },
    SORT_PRODUCT(state,action){
        const{products ,sort} = action.payload
        let newData = []
        if(sort == "lastest"){
            newData = products;
        }
        if(sort =='lower-price'){
            newData = products.slice().sort((a,b) =>{
                return a.price - b.price;
            })
        }
        if(sort =='highest-price'){
            newData = products.slice().sort((a,b) =>{
                return b.price - a.price;
            })
        }
        if(sort =='a-z'){
            newData = products.slice().sort((a,b) =>{
                return a.name.localeCompare(b.name);
            })
        }
        if(sort =='z-a'){
            newData = products.slice().sort((a,b) =>{
                return b.name.localeCompare(a.name);
            })
        }
        state.filterProduct = newData
    },
    FILTER_BY_CATEGORY(state,action){
        const {data,cat} = action.payload

        let tmpData = []
        if(cat === 'All'){
            tmpData = data
        }
        else{
            tmpData = data.filter((item) => item.category === cat)
        }
        state.filterProduct = tmpData
    },
    FILTER_BY_PRICE(state,action){
        console.log(action.payload);
        const {data,price} = action.payload
        let newData = data.filter((item) => item.price <= price)
        state.filterProduct = newData
    }
    
  }
});

export const {FILTER_BY_SEARCH,SORT_PRODUCT,FILTER_BY_CATEGORY, FILTER_BY_PRICE} = filterProduct.actions
export const selectFilterProduct = (state) => state.filter.filterProduct
export default filterProduct.reducer