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
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import image from 'https://preview.colorlib.com/theme/bootstrap/login-form-02/images/bg_1.jpg.webp'
const Login = () => {
  const [email,setEmail] = useState('');
  const [ password,setPassword] = useState("")
  const navigate = useNavigate()


  const SignWithGoogle = () =>{
    const provider = new GoogleAuthProvider(); 
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        toast.success("Login succsefully...")
        navigate('/')
    }).catch((error) => {
        toast.error(error.message)
    });
}
  const handleSubmit = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("Login succsefully...")
        navigate('/')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
    });


  


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
                    <Form className='login' onSubmit={ (e) =>handleSubmit(e)}>
                        <h3>Login to shopping</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) =>setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) =>setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3 check" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                            <a href="#!">Forgot password</a>
                        </Form.Group>
                        <Button  variant="primary" type="submit">
                            Login
                        </Button>
                        <p className='or'>--or--</p>
                        <Button onClick={() => SignWithGoogle()} className='google' variant="primary" type="button">
                            <span className='icon'><BsGoogle/></span> Login with Google
                        </Button>
                        <p>Don't have an account? <span><Link className='link' to={'/register'}>Register</Link></span> </p>
                        <p>Forget password? <span><Link className='link' to={'/reset'}>Reset password</Link></span> </p>
                        
                    </Form>
                </Col>

               
            </Row>
        </Container>
    </div>
  )
}

export default Login