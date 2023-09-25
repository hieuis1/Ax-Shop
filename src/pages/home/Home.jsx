

import Slider from '../../components/carousel/Carousel'
import { Col, Container, Row } from 'react-bootstrap'
import Product from '../../components/product/product/Product'
import About from '../../components/home/About'
import Service from '../../components/home/Service'
import Blog from '../../components/home/Blog'
import Branch from '../../components/home/Branch'
import Contact from '../../components/home/Contact'



const Home = () => {
  return (
    <div className='home'>
       <Slider/>
       <About/>
       <Service/>
       <Blog/>
       <Branch/>
       <Contact/>
    </div>
  )
}

export default Home