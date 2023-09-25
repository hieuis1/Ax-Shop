import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsFillGridFill,BsSearch } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import './ProductList.scss'
import ProductCar from '../productCar/ProductCar';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, SORT_PRODUCT } from '../../../redux/slices/filterProduct';
import Pagination from '../pagination/Pagination';


const ProductList = ({products}) => {
   const disPatch = useDispatch();
   const filterProduct = useSelector(state => state.filter.filterProduct)
  let [grid,setGrid] = useState(true)
  let[search,setSearch] = useState("")
  let[sort,setSort] = useState("lastest")
  let [currentPage ,setCurrentPage] = useState(1)
  let [productPerPage, setProductPerPage] = useState(6)
  const indexOfLastProduct = currentPage * productPerPage //last = 4
  const indexOfFirstProduct = indexOfLastProduct - productPerPage // first = 2
  const currentProducts = filterProduct.slice(indexOfFirstProduct,indexOfLastProduct)
  
  
   useEffect(() =>{
        disPatch(FILTER_BY_SEARCH({products,search}))
    },[search,disPatch,products])
    useEffect(() =>{
        disPatch(SORT_PRODUCT({products,sort}))
    },[disPatch,products,sort])

  return (
    <div style={{paddingLeft:'0'}} className='productList'>
        <div className="top">
        
        <Container>
            <Row>
                <Col>
                    <div className="gridSetting">
                        <div className='setting'>
                            <div className='s1' onClick={() => setGrid(true)}><BsFillGridFill/></div>
                            <div className="s2" onClick={() => setGrid(false)}><FaListAlt/></div>
                    </div>
                        <p>{filterProduct.length} product was found</p>
                    </div>
                </Col>


                <Col>
                    <div className="search">
                        <label htmlFor=""><BsSearch/></label>
                        <input value={search} onChange={(e) =>setSearch(e.target.value)} type="text" placeholder='Search...' name='search' />
                    </div>
                </Col>

                <Col>
                    <label htmlFor="sort" style={{fontSize:'15px'}}>Sort by: </label>
                    <select value={sort} onChange={(e) =>setSort(e.target.value)} className='sortProduct' name="sort">
                        <option value="lastest">--Sort--</option>
                        <option value="highest-price">Highest price</option>
                        <option value="lower-price">Lowest price</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>
                </Col>
            </Row>
        </Container>
        </div>
        <div className="bottom">
            
            <Container>
                <Row>
            {filterProduct.length === 0 ?  (<p style={{fontSize:'30px', marginTop:"10px"}}>No product found.</p>) : (
                currentProducts.map((item) =>{
                    return(
                       <Col key={item.id} lg ={grid? 6: 12}>
                            <ProductCar item={item} grid={grid} id={item.id} name={item.name} image={item.image} price={item.price} rating={item.rating} desc={item.desc} category={item.category}/>
                       </Col>
                    )
                })
            )}
                </Row>
            </Container>
        </div>
        
        <Pagination
            currentPage = {currentPage}
            setCurrentPage = {setCurrentPage}
            productPerPage ={productPerPage}
            totalProducts = {filterProduct.length}
        />
    </div>
  )
}

export default ProductList