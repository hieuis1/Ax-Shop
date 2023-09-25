import React, { useEffect, useState } from 'react'
import './productfilter.scss'
import { useSelector,useDispatch } from 'react-redux'
import { GET_RANGE_PRICE, fetchProducts } from '../../../redux/slices/productsSlice'
import { FILTER_BY_CATEGORY,FILTER_BY_PRICE } from '../../../redux/slices/filterProduct'

const ProductFilter = () => {
  const [activeSelect, setActiveSelect] = useState("All")
  const data = useSelector((state) => state.products.listProduct)
  const disPatch = useDispatch()
  const priceMax = useSelector(state => state.products.maxPrice)
  const priceMin = useSelector(state => state.products.minPrice)
  const [price,setPrice] = useState(priceMax)
  const handleClick =(cat) =>{
    setActiveSelect(cat)
    disPatch(FILTER_BY_CATEGORY({data,cat}))
  }
  const hanlePrice =(e) =>{
    disPatch(FILTER_BY_PRICE({price,data}))
    setPrice(e.target.value)
    
  }
  useEffect(() =>{
    disPatch(fetchProducts())
  },[])
  const category = ["All",...new Set(data.map((item) => item.category))]

  useEffect(() =>{
    disPatch(GET_RANGE_PRICE({data}))
  },[data])
  return (
    <div className='filter'>
      <div className="category">
        <h3>Category</h3>
          {category.map((cat,index) =>{
              return(
                <button onClick={() =>handleClick(cat)} className={activeSelect === cat? "active": ""} key={index} >{cat}</button>
              )
          })}
      </div>
      <div className="price">
        <h3>Price</h3>
        <p>${price}</p>
        <input value={price}  onChange={(e) =>hanlePrice(e)} type="range" min={priceMin} max={priceMax+3} name='process' />
      </div>
    </div>
    
  )
}

export default ProductFilter