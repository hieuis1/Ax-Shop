import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slices/authSlice'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './order.scss'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import OrderDetail from './OrderDetail';
const Order = () => {
 
  const {id} = useParams()
  const [orderList,setOrderList] = useState([])
  const email = useSelector(selectEmail)
  useEffect(() =>{
    axios.get('https://6503cfbcc8869921ae242e2e.mockapi.io/order')
    .then((data) =>{
        let newData = data.data.filter((item,index) => item.bill.email === email)
        setOrderList(newData)
    },)
  },[])
  
  if(id ==="All"){
    return (
      <div className='history' style={{height:"100vh",marginTop:'50px'}}>
        <Container>
          <h2>History</h2>
          <Table className='mt-3' striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Order Amout</th>
                    <th>Email Order</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((item,index) =>{
                      return(
                      <tr key={`item${index}`}>
                          <th><Link to={`/order/${item.id}`}>{index+1}</Link></th>
                          <th><Link to={`/order/${item.id}`}>{item.bill.date}</Link></th>
                          <th><Link to={`/order/${item.id}`}>{item.bill.total}.00$</Link></th>
                          <th><Link to={`/order/${item.id}`}>{item.bill.email}</Link></th>
                          <th><Link to={`/order/${item.id}`} className={item.bill.status === "Delivered..."?"statusActive":"status"}>{item.bill.status}</Link></th>
                      </tr>
                      )
                  })}
                </tbody>
            </Table>
        </Container>
      </div>
      
    )
  }
  else{
      return(
        <OrderDetail/>
      )

  }
}


export default Order