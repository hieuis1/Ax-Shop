import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import './adminOrder.scss'
import AdminOrderDetail from './AdminOrderDetail';
const AdminOrder = () => {
  const {id} = useParams()
  const [orderList, setOrderList] = useState([]);
  useEffect(() =>{
    axios.get('https://6503cfbcc8869921ae242e2e.mockapi.io/order')
    .then((data) =>{
        setOrderList(data.data)
    },)
  },[])
  if(id === "All"){
    return(
      <div className="admin_order mt-4 mb-3">
          <h2>All order</h2>
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
                    const {bill,cartList} = item
                    return(
                    <tr key={`item${index}`}>
                        <th><Link to={`/admin/order/${item.id}`}>{item.id}</Link></th>
                        <th><Link to={`/admin/order/${item.id}`}>{bill.date}</Link></th>
                        <th><Link to={`/admin/order/${item.id}`}>{bill.total}.00$</Link></th>
                        <th><Link to={`/admin/order/${item.id}`}>{bill.email}</Link></th>
                        <th><Link className={bill.status ==="Delivered..."? 'statusActive': "status"} to={`/admin/order/${item.id}`}>{bill.status}</Link></th>
                    </tr>
                    )
                })}
              </tbody>
          </Table>
      </div>
    )
  }
  else{
    return(
      <div>
        <AdminOrderDetail data={orderList} />
      </div>
    )
  }
}

export default AdminOrder