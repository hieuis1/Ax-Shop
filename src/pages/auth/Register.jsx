import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './auth.scss'
import image from '../../assets/images/bg_1.jpg.webp'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import { useNavigate} from 'react-router-dom';

const Register = () => {
  const navigate  = useNavigate()
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setconfirmPassword] = useState("");
  const handleSubmit = (e) =>{
        e.preventDefault();
        if(confirmPassword != password){
            toast.error("Wrong password")
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                toast.success("Resgistration successful...")
                navigate('/login')

                // ...
            })
            .catch((error) => {  
                const errorCode = error.code;
                const errorMessage = error.message; 
               toast.error(errorMessage)
                // ..
            });


  }
  return (
    
        <div className="registerForm">
            <Container fluid>
                <Row>
                    <Col md={12} lg={6}>
                        <div className="image">
                            <img src={image} alt="" />
                        </div>
                        
                    </Col>
                    <Col>
                        <Form className='register' onSubmit={handleSubmit} >
                            <h3>Register</h3>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control onChange={(e) => setconfirmPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>
                                <Button variant="primary" type="submit">
                                    Register
                                </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
            
        </div>
   
  )
}

export default Register