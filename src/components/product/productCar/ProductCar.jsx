import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './productCar.scss'
import { BsStar } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, TOTAL_QUANTITY } from '../../../redux/slices/cartSlice';


const ProductCar = (props) => {
    const item = props.item
    const desc = props.desc
    const disPatch = useDispatch();
    const shortDesc = (desc) => {
        if(desc.length > 100 && props.grid){
            let newDesc = desc.substring(0,50).concat("...")
            return newDesc;
        }
        else if(desc.length > 200 && !props.grid){
          let newDesc = desc.substring(0,150).concat("...")
          return newDesc;
        }
        return desc;
    }
    const addToCart = () =>{
      disPatch(ADD_TO_CART(item))
    }
  return (
  <div className={props.grid?"product-card":"productCardGrid"}>
		<Link to={`/product-detail/${props.id}`}>
    <div className="product-tumb">
			<img src={props.image} alt=""/>
		</div>
    </Link>
		<div className="product-details">
			<span className="product-catagory">{props.category}</span>
			<div >
          <Link className="name" to={`/product-detail/${props.id}`}>
                <h4><a href="">{props.name}</a></h4>
                
          </Link>
      </div>
			<p>{shortDesc(props.desc)}</p>
			<div className="product-bottom-details">
				<div className="product-price">${props.price}.00</div>
				<div className="product-links">
             <Button onClick={() => addToCart()} variant="primary">Add to cart</Button>{' '}
				</div>
			</div>
		</div>
	</div>
  )
}

export default ProductCar