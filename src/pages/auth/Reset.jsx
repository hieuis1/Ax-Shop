import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './auth.scss'
import image from '../../assets/images/bg_1.jpg.webp'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsGoogle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import image from 'https://preview.colorlib.com/theme/bootstrap/login-form-02/images/bg_1.jpg.webp'
const Reset = () => {
    const [email,setEmail] = useState('')
    const resetPass = (e) =>{
        e.preventDefault()
        sendPasswordResetEmail(auth,email)
        .then(() =>{
            toast.success("Check your mail to reset password")
        })
    }
    return (
        <div className="loginForm">
            <Container fluid>
                <Row>
                     <Col>
                        <div className="image">
                            <img src={image} alt="" />
                        </div>
                    </Col>
                    <Col sm={12} lg={6}>   
                        <Form className='login' onSubmit={(e) => resetPass(e)}>
                            <h3>Reset password</h3>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter email: </Form.Label>
                                <Form.Control value={email} onChange={(e) =>setEmail(e.target.value)} type="email" placeholder="Email" />
                                <Button  variant="primary" type="submit">
                                        Send to email
                                </Button>
                                <div className='toLogin'>
                                    <Link to={'/login'}>--Login--</Link>
                                    <Link to={"/register"}>--Register--</Link>

                                </div>
                            </Form.Group>

    
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
      )

  


  }
  


export default Reset