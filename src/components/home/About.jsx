import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import picture from '../../assets/images/company.png'
import './home.scss'
import { Link } from 'react-router-dom';
import WOW from 'wowjs'
import AOS from 'aos';
import 'aos/dist/aos.css';
const About = () => {
  AOS.init();
  return (
    <div className='about'>
        <Container className='about__item'>
            <div className="about__left" data-aos="fade-right" data-aos-duration="2000">
                    <h2>About <span>Our Company</span></h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of</p>
                    <Link style={{textDecoration:"none"}} to={'/shop'}><Button style={{backgroundColor:"#e99c2e", border:'none'}}>Go to shop</Button>{' '}</Link>
            </div>
            <div className="about__right" data-aos="fade-left" data-aos-duration="2000" >
                     <div className="image">
                        <img src={picture} alt="" />
                    </div>
            </div>       
            
        </Container>
    </div>
  )
}

export default About