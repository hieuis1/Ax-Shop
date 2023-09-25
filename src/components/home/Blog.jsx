import React from 'react'
import { Container } from 'react-bootstrap'
import b1 from '../../assets/images/b1.jpg'
import b2 from '../../assets/images/b2.jpg'
import b3 from '../../assets/images/b3.jpg'
const Blog = () => {
  return (
    <div className='blog'>
        <Container>
            <div className="blog__top">
                <h2>Latest Blog</h2>
            </div>
            <div className="blog__bottom">
                <div className="blog__item">
                    <img src={b1} alt="post" />
                    <h6>Why Brands are Looking at Local Language</h6>
                    <p className='auth'>By Robert Norby / 18th March 2018</p>
                    <p className='desc'>Nemo Enim Ipsam Voluptatem Quia Voluptas Sit Aspernatur Aut Odit Aut Fugit, Sed Quia Consequuntur Magni Dolores Eos Qui Ratione Voluptatem Sequi Nesciunt....</p>
                </div>
                <div className="blog__item">
                    <img src={b2} alt="post" />
                    <h6>Why Brands are Looking at Local Language</h6>
                    <p className='auth'>By Robert Norby / 18th March 2018</p>
                    <p className='desc'>Nemo Enim Ipsam Voluptatem Quia Voluptas Sit Aspernatur Aut Odit Aut Fugit, Sed Quia Consequuntur Magni Dolores Eos Qui Ratione Voluptatem Sequi Nesciunt....</p>
                </div>
                <div className="blog__item">
                    <img src={b3} alt="post" />
                    <h6>Why Brands are Looking at Local Language</h6>
                    <p className='auth'>By Robert Norby / 18th March 2018</p>
                    <p className='desc'>Nemo Enim Ipsam Voluptatem Quia Voluptas Sit Aspernatur Aut Odit Aut Fugit, Sed Quia Consequuntur Magni Dolores Eos Qui Ratione Voluptatem Sequi Nesciunt....</p>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Blog