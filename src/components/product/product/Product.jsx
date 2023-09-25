import React, { useEffect, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import ProductFilter from '../productFilter/ProductFilter'
import ProductList from '../productList/ProductList'
import { fetchProducts } from '../../../redux/slices/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { TOTAL_QUANTITY } from '../../../redux/slices/cartSlice'


const Product = () => {
    const disPatch = useDispatch();
    const data = useSelector((state) => state.products.listProduct)
    useEffect(() =>{
        disPatch(TOTAL_QUANTITY())
      },[])
    useEffect(() =>{
        disPatch(fetchProducts())
    },[])
  return (
    <div className='product'>
        <Container>
            <Row>
                <Col style={{paddingRight:'0'}} lg={3}> 
                    <ProductFilter/>
                </Col>
                <Col style={{paddingLeft:'0'}}>
                    <ProductList products={data}/>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Product