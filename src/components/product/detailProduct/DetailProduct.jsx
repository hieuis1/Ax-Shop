import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './productDetail.scss'
import { Col, Container, Row } from 'react-bootstrap';
import { ImStarEmpty,ImStarHalf,ImStarFull } from "react-icons/im";
import Button from 'react-bootstrap/Button';
import { BsBoxArrowLeft } from "react-icons/bs";
import { GrAdd, GrFormSubtract} from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_FROM_DETAIL } from '../../../redux/slices/cartSlice';
import avatar from '../../../assets/images/avatar.jpg'
import { selectIsLogin, selectUserName } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';

const DetailProduct = () => {
  const navigate = useNavigate()
  const disPatch = useDispatch();
  const [product,setProduct] = useState({})
  const [commentDetail, setCommentDetail] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [comment,setComment] = useState('')
  const {id} = useParams();
  const isLogin = useSelector(selectIsLogin)
  const userName = useSelector(selectUserName)
  useEffect(() =>{
    axios.get(`https://6503cfbcc8869921ae242e2e.mockapi.io/product/${id}`)
    .then((res) =>{
      setProduct(res.data)
      setCommentDetail(res.data.comment)
    } )
  },[])
  const decrease = () => {
    if(quantity !== 1){
      setQuantity(prev => prev - 1)
    }
  }
  const addToCart = () =>{
    disPatch(ADD_FROM_DETAIL({product,quantity}))
  }
  const addComment = (e) =>{
    e.preventDefault()
    let newComment = product.comment
    newComment.push({userName,comment})
    let newdata = {...product,comment:newComment}
    axios.put(`https://6503cfbcc8869921ae242e2e.mockapi.io/product/${id}`,newdata)
    .then(() => toast.success("Add comment successfully.."))
    .then(() => setComment(""))
  }
  
  
  return (
    <>
    <Container className='backHome'>
      <h2>Product Detail</h2>
      <div className='back'>
        <p onClick={() => navigate('/')}><BsBoxArrowLeft/> <span>Back to Shop</span></p>
      </div>
    </Container>
    <div className="detail">
        <Container className='containerDetail'>
           <Row className='gap-3'> 
              <Col lg={4}>
                  <div className="image-detail">
                      <img src={product.image} alt="" />
                  </div>
              </Col>


              <Col>
                  <div className="descript">
                      <h3 className='name'>
                          {product.name}
                      </h3>

                      
                  <div className='review'>
                        <Row className='align-item-center reviewDetail'>
                          <Col lg={1} className='sartRating'>
                              <p>{product.rating}</p>
                          </Col>
                          <Col lg={2} className='starDetail'>
                             <div className="iconReview">
                              <ImStarFull/>
                              <ImStarFull/>
                              <ImStarFull/>
                              <ImStarFull/>
                              <ImStarHalf/>
                             </div>
                          </Col> 
                             
                          <Col lg={2}><p>0 <span>review</span></p></Col>
                          <Col><p>0 <span>sold</span></p></Col>
                        </Row>
                      </div>
                  </div>


                  <div className="price">
                    <p>{product.price}.00$</p>
                  </div>

                  <div className='desc'>
                    <p>- {product.desc}</p>
                  </div>

                  <div className="action">
                    <div onClick={() => setQuantity(prev => prev+ 1)} className='iconAction'>< GrAdd size={13}/></div>
                    <p>{quantity}</p>
                    <div onClick={() => decrease()} className='iconAction'><GrFormSubtract/></div>
                  </div>

                  <div className="addToCart">
                    <Button onClick={() => addToCart()} variant="primary">Add to cart</Button>{' '}
                  </div>
              </Col>
           </Row>
        </Container>
    </div>
    <Container>
      <div className="commentDetail mt-5">
        <h2>All comment</h2>
         {commentDetail.length === 0? <p>No comment</p>: 
                commentDetail.map((item,index) =>{
                 return(
                  <div key={`comment${index}`} className="commentItem">
                    <div className="item_avatar">
                      <img src={avatar} alt="" />
                      <p>{item.userName}</p>
                    </div>
                    <p>{item.comment}</p>
                 </div> 
                 )
              })
            }
      </div>
     {isLogin?
      <div className="comment">
          <img src={avatar} alt="" />
          <p>{userName} :</p>
          <form onSubmit={addComment}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="comment" cols="30" rows="3"></textarea>
            <Button type='submit' variant="primary">Add Comment</Button>{' '}
          </form>
      </div> : 
      <Link to={'/login'}><Button  variant="primary">Login to comment</Button>{' '}</Link>}
    </Container>
    </>
  )
}

export default DetailProduct