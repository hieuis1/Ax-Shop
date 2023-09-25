import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './checkout.scss'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import atm from '../../assets/images/atm.png'
import shipper from '../../assets/images/shipper.png'
import momo from '../../assets/images/MoMo_Logo.png'
import paymomo from '../../assets/images/momoPAy.jpg'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CLEAR_CART } from '../../redux/slices/cartSlice';
import { selectEmail } from '../../redux/slices/authSlice';
const Checkout = () => {
    const [cardNumber,setCarNumber] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const disPatch = useDispatch();
    const checkout =() =>{
    const img = `<img src="" alt="" />`
    }
    const bill = useSelector(state => state.bill.checkoutBill)
    const email = useSelector(selectEmail)
    const buyNow = () =>{
        let date = new Date()
        let hours = date.getHours()
        let minute = date.getMinutes();
        let day =date.getDate();
        let month = date.getMonth()
        let year = date.getFullYear();
        let dataDate = `${day}-${month}-${year} ${hours}:${minute}`
        let data = {bill:{...bill, total:total,date:dataDate,status:"Oder Placed..."},cartList}
        axios.post('https://6503cfbcc8869921ae242e2e.mockapi.io/order',data)
        .then(() =>{
            toast.success("Order successfully..")
            disPatch(CLEAR_CART())
            navigate("/cart")
        })
    }
    const total = useSelector(state => state.cart.total)
    const cartList = useSelector(state => state.cart.listCarts)
    const quantity = useSelector(state => state.cart.quantity)
  return (
    <div className='saveBill mt-5' >
        <Container>
            <Row className='gap-5'>
                <Col lg={4}>
                    <div className="sumary" >
                        <h4>Checkout Summary</h4>
                        <p>Cart item(s): <span>{quantity}</span></p>
                        <h4 className='totalCart'>Total: <span>{total}.00$</span></h4>
                        {cartList.map((item,index) => {
                            return(
                                <div key={index} className="item">
                                    <h5>Product: {item.name}</h5>
                                    <p className="quantity">Quantity: {item.quantity}</p>
                                    <p className="price">Unit price: {item.price}$</p>
                                    <p className="total">Set price: {item.price * item.quantity}$</p>
                                </div>
                            )
                        })}

                    </div>
                </Col>

                <Col>
                    <div  className='pay' >
                        <h4 className='mb-3'>Payment by: </h4>
                        <div className="ship">

                            <Tabs
                                defaultActiveKey="profile"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                >
                                <Tab eventKey="momo" title="Payment by Momo">
                                    <img src={momo} alt="" className='momo'  />
                                    <img src={paymomo} alt="" className='payMomo' />
                                    <Button onClick={buyNow} variant="primary">Buy now</Button>{' '}
                                </Tab>
                                <Tab eventKey="home" title="Payment by card" className='tab'  >
                                    <img className='atm' src={atm} alt="" />
                                    <Form style={{width:"300px" ,margin:"auto"}}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Card number: * </Form.Label>
                                            <Form.Control value={cardNumber} onChange={() => setCarNumber(e.target.value)} type="email" placeholder="9704 1234 5678 9123 012" required />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Cardholder name: *</Form.Label>
                                            <Form.Control value={name} onChange={() => setName(e.target.value)} type="text" placeholder="NGUYEN VAN A" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group>
                                        <Button onClick={buyNow} variant="primary" type="submit">
                                            Buy now
                                        </Button>
                                    </Form>
                                </Tab>
                                <Tab eventKey="profile" title="Payment on delivery">
                                    <img src={shipper} alt="" className='shipper' />
                                    <div className="deliver__detail">
                                        <p>First name: {bill.firstName}</p>
                                        <p>Last name: {bill.lastName} </p>
                                        <p>Email: {bill.email}</p>
                                        <p>Country: {bill.country}</p>
                                        <p>City: {bill.city}</p>
                                        <p>Address: {bill.address}</p>
                                        <p>Phone number: {bill.phone}</p>
                                    </div>
                                    <Button onClick={buyNow} variant="primary">Buy now</Button>{' '}
                                </Tab>
                            </Tabs>
                                                
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Checkout