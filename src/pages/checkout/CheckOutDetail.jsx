import React from 'react'
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './checkout.scss'
import { CountryDropdown } from 'react-country-region-selector';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SAVE_BILL } from '../../redux/slices/checkoutSlice';
import { selectEmail } from '../../redux/slices/authSlice';

const CheckOutDetail = () => {
    const cartList = useSelector(state => state.cart.listCarts)
    const email = useSelector(selectEmail)
    const [address, setAddress] = useState({
        firstName: '',
        lastName:'',
        email:email,
        country:"",
        city:"",
        address:"",
        phone:'',
        status:''
    })
    const navigate = useNavigate()
    const disPatch = useDispatch()
    const handleChange = (e) =>{
        const {name,value} = e.target
        setAddress({...address,[name]:value})
    }
    const quantity = useSelector(state => state.cart.quantity)
    const [validated, setValidated] = useState(false);
    const total = useSelector(state => state.cart.total)
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      disPatch(SAVE_BILL(address))
      setValidated(true);
      navigate('/checkout')
    };
  return (
    <div className='checkout mt-5'>
        <h2 className='checkout__head mb-3'>Billing Address</h2>
        <Container>
            <Row>
                <Col lg={6}>
                    <div className="checkout__left">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    name='firstName'
                                    onChange={(e) => handleChange(e)}
                                    value={address.firstName}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    name='lastName'
                                    onChange={(e) => handleChange(e)}
                                    value={address.lastName}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                    type="text"
                                    placeholder="Email"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    name='email'
                                    value={email}
                                    disabled

                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Please choose a email
                                    </Form.Control.Feedback>
                                </InputGroup>
                                </Form.Group>
                            </Row>
                            <CountryDropdown classes='country' value={address.country}  onChange={val => setAddress({...address,country:val})}/>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>City</Form.Label>
                                <Form.Control name='city' type="text" placeholder="City" onChange={(e) => handleChange(e)} value={address.city}  required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom04">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name='address' type="text" placeholder="Address" value={address.address} required onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid address.
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12" controlId="validationCustom05">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control name='phone' type="text" placeholder="Phone" value={address.phone} required onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid phone number.
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                                />
                            </Form.Group>
                            <Button type="submit">Go to checkout</Button>
                         </Form>
                    </div>
                </Col>

                <Col lg={5}>
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
            </Row>
        </Container>
    </div>
  )
}

export default CheckOutDetail