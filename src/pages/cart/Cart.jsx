import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link, useNavigate } from 'react-router-dom';
import './cart.scss'
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { CLEAR_CART, DECREASE_QUANTITY, DELETE_PRODUCT, INCREASE_QUANTITY, SET_PREV_URL, TOTAL_PRICE, TOTAL_QUANTITY } from '../../redux/slices/cartSlice';
import { clear } from '@testing-library/user-event/dist/clear';
import { selectIsLogin } from '../../redux/slices/authSlice';
const Cart = () => {
  let cartList = useSelector((state) => state.cart.listCarts)
  let totalQuantity = useSelector(state => state.cart.quantity)
  let totalPrice = useSelector(state => state.cart.total)
  const disPatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector(selectIsLogin);
  const increaseQuantity = (item) => {
    disPatch(INCREASE_QUANTITY(item))
  }
  const decreaseQuantity =(item) =>{
    disPatch(DECREASE_QUANTITY(item))
  }
  const clear = () =>{
    disPatch(CLEAR_CART())
  }
  useEffect(() =>{
    disPatch(TOTAL_QUANTITY())
    disPatch(TOTAL_PRICE())
  },[totalPrice,totalQuantity])

  const deleteProduct =(item)=>{
    disPatch(DELETE_PRODUCT(item))
  }
  const URL = window.location.href
  const checkOut = () =>{
    if(isLogin){
      navigate('/checkout-detail')
    }
    else{
      disPatch(SET_PREV_URL(URL))
      navigate('/login')
    }
    
  }
  if(cartList.length == 0){
    return(
      <Container style={{height:"100vh"}}>
        <div style={{marginTop:"20px",height:'80vh'}} className="notfound">
         <Link style={{color:'#333'}} to="/">Back to shopping</Link>
         <h2 style={{marginTop:'10px'}}>Cart is empty</h2>
      </div>
      </Container>
    )
  }
  else{
    return(
    <Container style={{height:"100vh"}}>
    <div className='cart' >
        <h2 style={{marginTop:'20px',marginBottom:'20px'}}>Product Cart</h2>
        <Table striped bordered hover>
        <thead className='text-center'>
          <tr className='head'>
            <th>#</th>
            <th>Product name</th>
            <th>Poduct image</th>
            <th>Product price</th>
            <th>Product quantity</th>
            <th>Total</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((item,index) =>{
             return(
              <tr className='text-center' key={index}>
                <th>{index}</th>
                <th>{item.name}</th>
                <th><img style={{width:'100px', height:'100px',objectFit:"contain"}} src={item.image} alt="" /></th>
                <th>{item.price}.00$</th>
                <th>
                  <div className="btn">
                      <button className='btnActive' onClick={() => increaseQuantity(item)}>+</button>
                      <p className='quantity'>{item.quantity}</p>
                      <button onClick={() => decreaseQuantity(item)} className='btnActive'>-</button>
                  </div>
                </th>
                <th>{item.price * item.quantity}.00$</th>
                <th style={{cursor:"pointer"}}  onClick={() => deleteProduct(item)} >< BsFillTrashFill color='red' size={20}/></th>
             </tr>
             )
          })}
        </tbody>
    </Table>
    </div>

    <div className='bottom'>
      <div className="clear">
      <Button variant="danger" onClick={() => clear()}>Clear cart</Button>{' '}
      </div>
      <div className="checkout">
        <h4>Cart item(s) : <span>{totalQuantity}</span></h4>
        <div className="total">
          <h2>Total: </h2>
          <p className='totalPrice'>${totalPrice}.00</p>
        </div>
        <Button onClick={checkOut} variant="primary">Check out</Button>{' '}
      </div>
    </div>
    </Container>
    )
  }

}

export default Cart