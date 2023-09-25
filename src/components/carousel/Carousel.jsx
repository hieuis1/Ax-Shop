import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { slideData } from './data/slideData';
import './carousel.scss'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return(
    <Carousel>
        {slideData.map((item,index) =>{
      return(
          <Carousel.Item key={`item-${index}`} className={`item${index+1}`}>
            <img className='slide-img' src={item.image}/>
            <Carousel.Caption className='caption'>
              <p className='header'>Great Design Collection</p>
              <h3>Mapple Wood Accent Chair</h3>
              <p className='desc'>Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiuiana Smod Tempor Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip.</p>
              <Link to={'/shop'}><Button>Shop now</Button>{' '}</Link>
            </Carousel.Caption>    
          </Carousel.Item>  
      )
  })}
    </Carousel>
  )
  
}

export default Slider;