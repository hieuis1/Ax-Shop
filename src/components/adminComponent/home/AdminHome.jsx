import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AiFillDollarCircle,AiOutlineShoppingCart} from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import './adminHome.scss'
import { fetchProducts } from '../../../redux/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AdminHome = () => {
  const disPatch = useDispatch()
  const data = useSelector((state) => state.products.listProduct)
  const [order,setOrder] = useState([])
  useEffect(() =>{
    disPatch(fetchProducts())
    axios.get(`https://6503cfbcc8869921ae242e2e.mockapi.io/order`)
    .then((data) =>{
      setOrder(data.data)
    })
  },[])
  let sum = 0;
  order.forEach((item) =>{
    sum += item.bill.total;
  })
  return (
    <div className='adminHome'>
       <Container>
         <Row>
           <Col lg={3} >
              <div className='earning'>
                  <h3>Earnings</h3>
                  <div className="item">
                    <p>${sum}</p>
                    <p><AiFillDollarCircle color='orange'/></p>
                  </div>
              </div>
           </Col>
           <Col lg={3}>
              <div className='products'>
                  <h3>Products</h3>
                  <div className="item">
                    <p>{data.length}</p>
                    <p><AiOutlineShoppingCart color='rgb(193, 11, 193)'/></p>
                  </div>
                  
              </div>
           </Col >
           <Col lg={3}>
              <div className='order'>
                  <h3>Order</h3>
                  <div className="item">
                    <p>{order.length}</p>
                    <p><BsFillCartCheckFill color='rgb(0, 157, 255)'/></p>
                  </div>
              </div>
           </Col>
         </Row>
       </Container>
    </div>
  )
}

export default AdminHome