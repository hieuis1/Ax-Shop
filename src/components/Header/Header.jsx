import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink,Link } from 'react-router-dom';
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from '../../redux/slices/authSlice';
import ShowLogin, {ShowLogout} from '../hidden/ShowLogin';
import AdminHidden from '../hidden/AdminHidden';
import { BsCart4 } from "react-icons/bs";
import { TOTAL_QUANTITY } from '../../redux/slices/cartSlice';
const Header = () => {
  const quantity = useSelector(state => state.cart.headerQuantity)
  const dispatch = useDispatch()
  const [displayName,setDisplayName] = useState('')
  useEffect(() =>{
    dispatch(TOTAL_QUANTITY())
  },[quantity])
  const logout =() =>{
    signOut(auth).then(() => {
        toast.success("Log out succesfully...")
        // navigate('/')
    }).catch((error) => {
      toast.error(error)
    });
  }
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        if(user.displayName == null){
          let un = user.email.substring(0,user.email.indexOf('@'))
          const name = un.charAt(0).toUpperCase() + un.slice(1)
          setDisplayName(name)
        }
        else{
          setDisplayName(user.displayName)
        }
        dispatch(SET_ACTIVE_USER({
          email :user.email,
          userName:user.name?user.name: displayName ,
          userId : user.uid
        }))
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER( ))
      }
    });
  },[dispatch,displayName])

 
  return (
    <div className='header-wed'>
         <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-shop">
        <Container>
        <Navbar.Brand href="/">AX-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           <AdminHidden><Nav.Link as={NavLink}  className='link'  to="/admin/home">Admin</Nav.Link></AdminHidden>
            <Nav.Link as={NavLink} className='link'  to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} className='link'  to="/shop">Shop</Nav.Link>
          </Nav>
          <Nav className='person'>

              <ShowLogin>
                <Nav.Link id='user'>Hi,{displayName}
                  <div className='drop'>
                    <Nav.Link as={NavLink} to="/setting">Setting</Nav.Link>
                    <Nav.Link onClick={logout} as={NavLink} to="/">Logout</Nav.Link>
                  </div>
                </Nav.Link>
              </ShowLogin>
              <ShowLogout>
                <Nav.Link as={NavLink} className='link'  to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink}  className='link'  to="/register">Register </Nav.Link>
              </ShowLogout>
            <ShowLogin><Nav.Link   as={NavLink}  className='link'  to="/order/All">History </Nav.Link></ShowLogin>
            <Nav.Link as={NavLink}  className='link icon'  to="/cart">            
              <BsCart4 size={20}/>
              <span>{quantity}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header