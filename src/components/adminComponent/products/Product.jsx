import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts ,deleteProduct} from '../../../redux/slices/productsSlice'
import Table from 'react-bootstrap/Table';
import './products.scss'
import {AiFillEdit,AiFillDelete} from "react-icons/ai";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../product/pagination/Pagination';

const Product = () => {
  const navigeta = useNavigate()
  const disPatch = useDispatch()
  const data = useSelector((state) => state.products.listProduct)
  
  const handleDelete = (id) =>{
    disPatch(deleteProduct(id))
  }
 
  let [currentPage ,setCurrentPage] = useState(1)
  let [productPerPage, setProductPerPage] = useState(6)
  const indexOfLastProduct = currentPage * productPerPage //last = 4
  const indexOfFirstProduct = indexOfLastProduct - productPerPage // first = 2
  const currentProducts = data.slice(indexOfFirstProduct,indexOfLastProduct)
  
  useEffect(() =>{
    disPatch(fetchProducts())
  },[])
  return (
    <>
    <div className='viewProduct'>  
      <h3>All-product</h3> 
     <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {currentProducts.map((item,index) => {
              return(
                <tr key={`item${index}`}>
                  <th>{item.id}</th>
                  <th>{item.name}</th>
                  <th><img src={item.image} alt="" /></th>
                  <th>{item.price}</th>
                  <th>{item.rating}</th>
                  <th>{item.category}</th>
                  <th>
                    <div className="icon">
                        <Link to={`/admin/add-product/${item.id}`}><AiFillEdit className='edit' size={20}></AiFillEdit></Link>
                        <AiFillDelete onClick={() =>{handleDelete(item.id)}} className='delete' size={20}></AiFillDelete>
                    </div>
                  </th>
                </tr>
              )
            })}
        </tbody>
        
   </Table>
   
</div>
<Pagination
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        productPerPage ={productPerPage}
        totalProducts = {data.length}
    />
</>
  )
}

export default Product