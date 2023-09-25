import React, { useState } from 'react'
import './addproduct.scss'
import Button from 'react-bootstrap/Button';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebase/config';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../redux/slices/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const option = [
  {id: 1, name:'Laptop'},
  {id: 2, name:'Fashion'},
  {id: 3, name:'Phone'},
  {id: 4, name:'Electronic'},

]
const Addproduct = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const dataProduct = useSelector((state) => state.products.listProduct )
  const dataEdit = dataProduct.find((item) => item.id===id)
  const dectedForm = (id,f1,f2) =>{
    if(id === 'ADD'){
      return f1;
    }
    else{
      return f2;
    }
  }
  const disPatch = useDispatch()
  const [product,setProduct] = useState(() => dectedForm(id,{
    name:'',
    image:'',
    price:'',
    category:"",
    rating:'',
    desc:'',
    comment:[],
  }, dataEdit ))
  const handleSubmit =(e) =>{
      e.preventDefault()
      disPatch(addProduct(product))
      console.log(product);
      navigate('/admin/all-product')  
  }
  const handleEdit =(e) =>{
    e.preventDefault();
    axios.put(`https://6503cfbcc8869921ae242e2e.mockapi.io/product/${id}`,product)
    .then(()=>{
      toast.success("Update succesfully")
      navigate('/admin/all-product')      
    })
  }
  const handleInput = (e) =>{
    const {name,value} = e.target;
    setProduct({...product,[name]:value})
  }
  const handImage =(e) =>{
    const file = e.target.files[0];
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      toast.error(error.message)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({...product,image:downloadURL})
      });
    }
    );
  }
  return (
    <div className='addProduct'>
        <h3>{dectedForm(id,'Add new product',"Edit Product")}</h3>
        <form className='addInput' onSubmit={dectedForm(id,handleSubmit,handleEdit)}> 
            <div className="inputName">
              <label>Product name: </label>
              <input value={product.name} onChange={handleInput} type="text" name='name' required />
            </div>

            
            <div className='imgAdd'>
              <label>Product image: </label>
              <input onChange={handImage} type="file" name='image' accept='image/*'/>
              <input value={product.image} style={{display:'block'}} type="text" name='imageURL' disabled />
            </div>

            <div className="inputPrice">
              <label>Product price: </label>
              <input value={product.price} onChange={handleInput} type="text" required name='price' />
            </div>

            <div className="inputCategory">
              <label>Product categories:</label>
              <select value={product.category} onChange={handleInput} name="category" required>
                   -- Choose category --
                  <option disabled value="">-- Choose category --</option>
                  {option.map((item,index) =>{
                      return(
                        <option key={index} value={item.name}>{item.name}</option>
                      )
                  })}
              </select>
            </div>

            <div className="inputRating">
                  <label>Product rating: </label>
                  <input value={product.rating} onChange={handleInput} type="text" name='rating' required />
            </div>

            <div className="descInput">
                  <label>Description: </label>
                  <textarea value={product.desc} onChange={handleInput} name="desc" cols="30" rows="10"></textarea>
            </div>
            <button>Submit</button>


        </form>
    </div>
  )
}

export default Addproduct