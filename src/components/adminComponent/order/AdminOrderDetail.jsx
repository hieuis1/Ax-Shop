import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import './adminOrder.scss'
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify'
const AdminOrderDetail = () => {
    const [status, setStatus] = useState("")
    const [detail,setDetail] = useState()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() =>{
        axios.get(`https://6503cfbcc8869921ae242e2e.mockapi.io/order/${id}`)
        .then((data) => {
            setDetail(data.data)
        })
    },[])
    const updateStatus = () =>{
        if(status != ""){
            console.log(detail.bill);
            let newData = {...detail,bill:{...detail.bill,status:status}}
            axios.put(`https://6503cfbcc8869921ae242e2e.mockapi.io/order/${id}`,newData)
            .then(() => toast.success("Update successfully..."))
            .then(() =>{
                navigate('/admin/order/All')
                window.location.reload(false);
            })
        }
        else{
            toast.error("You have not selected yet")
        }
    }
  return (
    <div className='orderDetail'>
        <h2>Detail Order</h2>
        <p><b>Order Email: </b>{detail === undefined ? "":detail.bill.email }</p>
        <p><b>Order Amout: </b>{detail === undefined ? "":detail.bill.total }.00$</p>
        <p><b>Order Address: </b> {detail === undefined ? "":detail.bill.address}</p>
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
        <div className="update">
            <h3>Update Order Status</h3>
            <select onChange={(e) =>setStatus(e.target.value)} value={status}>
                <option disabled value="">--Select status--</option>
                <option value="Order Placed...">Order Placed</option>
                <option value="Shipped...">Shipped</option>
                <option value="Delivered...">Delivered</option>
            </select>
            <Button onClick={updateStatus} variant="primary">Update Status</Button>{' '}
        </div>
    </div>
  )
}

export default AdminOrderDetail