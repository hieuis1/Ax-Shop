
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slices/authSlice'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './order.scss'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const OrderDetail = () => {
    const {id } = useParams()
    const [detail,setDetail] = useState()
    const navigate = useNavigate()
    useEffect(() =>{
        axios.get(`https://6503cfbcc8869921ae242e2e.mockapi.io/order/${id}`)
        .then((data) => {
            setDetail(data.data)
        })
      },[])
      const cancel = ()=>{
        if(detail.bill.status === "Shipped..." || detail.bill.status === "Delivered..."){
          toast.error("Order is being shipped",{
            position: toast.POSITION.TOP_LEFT
          }) 
      }
      else{
        axios.delete(`https://6503cfbcc8869921ae242e2e.mockapi.io/order/${id}`)
        .then(() => toast.success("Order has been cancelled...",{
          position: toast.POSITION.TOP_LEFT
        }))
        .then(() => navigate('/order/All'))
  
      }
    }
    return (
        <Container>
          <div className='orderDetail' style={{height:"100vh",marginTop:'50px'}}>
            <h2>Detail Order</h2>
            <p><b>Order Email: </b>{detail === undefined ? "":detail.bill.email }</p>
            <p><b>Order Amout: </b>{detail === undefined ? "":detail.bill.total }.00$</p>
            <p><b>Order Address: </b> {detail === undefined ? "":detail.bill.address}</p>
            <p><b>Order Status: </b> {detail === undefined ? "":detail.bill.status}</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    { detail === undefined? "" :detail.cartList.map((item,index) =>{
                        return(
                            <tr key={`item${index}`}>
                                <th>{index+ 1}</th>
                                <th><div className="name"><p>{item.name}</p><img src={item.image} alt="" /></div></th>
                                <th>{item.quantity}</th>
                                <th>{item.price}.00$</th>
                                <th>{item.price * item.quantity}.00$</th>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button onClick={() => cancel()} variant="danger">Cancel order</Button>{' '}
        </div>
        </Container>
      )
}

export default OrderDetail