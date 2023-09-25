import React from 'react'
import { Container } from 'react-bootstrap'
import { GiCycle } from "react-icons/gi";
import { FaShippingFast,FaGift } from 'react-icons/fa';
import { MdOutlineSecurity} from "react-icons/md";
const Service = () => {
  return (
    <div className='service'>
        <Container>
            <div className="service__top">
                <h2>What we have</h2>
            </div>
            <div className="service__bottom">
                <div className="service__container">
                    <div className="item item1" data-aos="zoom-in-up" data-aos-duration="2000">
                        <p><GiCycle size={30}/></p>
                        <p>30 Days Return</p>
                    </div>
                    <div className="item item2" data-aos="zoom-in-up" data-aos-duration="2000">
                        <p><FaShippingFast size={30}/></p>
                        <p>Free Ship</p>
                    </div>
                    <div className="item item3" data-aos="zoom-in-up" data-aos-duration="2000">
                        <p><MdOutlineSecurity size={30}/></p>
                        <p>Secure Payment</p>
                    </div>
                    <div className="item item4" data-aos="zoom-in-up" data-aos-duration="2000">
                        <p><FaGift size={30}/></p>
                        <p>New Products</p>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Service