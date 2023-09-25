import React from 'react'
import { Container } from 'react-bootstrap'
import './home.scss'
import { AiOutlineSend} from "react-icons/ai";
const Contact = () => {
  return (
    <Container>
        <div className='contact'>
            <div className="item">
                <h5>Information</h5>
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>News</li>
                    <li>Store</li>
                </ul>
            </div>
            <div className="item">
            <h5>Collections</h5>
                <ul>
                    <li>Wooden Chair</li>
                    <li>Royal Cloth Sofa</li>
                    <li>Accent Chair</li>
                    <li>Laptop</li>
                </ul>
            </div>
            <div className="item">
            <h5>My Accounts</h5>
                <ul>
                    <li>My Account</li>
                    <li>Wishlist</li>
                    <li>Community</li>
                    <li>Order History</li>
                </ul>
            </div>
            <div className="item last">
                <h5>Newsletter</h5>
                <p>Subscribe to get latest news,update and information.</p>
                <form action="">
                    <input type="text" placeholder='Enter Email Here...' />
                    <AiOutlineSend size={25} color='orange' />
                </form>
            </div>
        </div>
    </Container>
  )
}

export default Contact