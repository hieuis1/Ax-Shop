import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink, Route, Routes } from 'react-router-dom';
import './admin.scss'
import AdminHome from '../../components/adminComponent/home/AdminHome';
import Addproduct from '../../components/adminComponent/addProduct/AddProduct';
import Product from '../../components/adminComponent/products/Product';
import AdminOrder from '../../components/adminComponent/order/AdminOrder';
const Admin = () => {
  return (
    <div className='admin'>
        <Container fluid>
          <Row className='gap-4'>
              <Col className='admin-left' lg={3}>
                  <div className="avatar">
                    <h3>Hello Admin</h3>
                  </div>
                  <div className="navBar">
                    <ul>
                      <li>
                        <NavLink to="home" >View</NavLink>
                      </li>
                      <li>
                        <NavLink to="add-product/ADD" >Add product</NavLink>
                      </li>
                      <li>
                        <NavLink to="all-product">All products</NavLink>
                      </li>
                      <li>
                        <NavLink to="order/All">Order</NavLink>
                      </li>
                    </ul>
                  </div>
              </Col>

              <Col className='admin-right'>
                  <Routes>
                      <Route path='home' element={<AdminHome/>}/>
                      <Route path='add-product/:id' element={<Addproduct/>}/>
                      <Route path='all-product' element={<Product/>}/>
                      <Route path='order/:id' element={<AdminOrder/>}/>
                  </Routes>
              </Col>
          </Row>
         
        </Container>

   
    </div>
  )
}

export default Admin