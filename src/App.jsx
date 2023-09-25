import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './pages/admin/Admin';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import Footer from './components/Footter/Footer';
import DetailProduct from './components/product/detailProduct/DetailProduct';
import CheckOutDetail from './pages/checkout/CheckOutDetail';
import Checkout from './pages/checkout/Checkout';
import Order from './pages/order/Order';
import AdminHidden from './components/hidden/AdminHidden';
import ShowLogin from './components/hidden/ShowLogin';
import WOW from 'wowjs'
import AOS from 'aos';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Contact/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin/*' element={<AdminHidden><Admin/></AdminHidden>}/>
            <Route path='/product-detail/:id' element={<DetailProduct/>} />
            <Route path='/reset' element={<Reset/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout-detail' element={<CheckOutDetail/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/order/:id' element={<ShowLogin><Order/></ShowLogin>}/>
        </Routes>
      <Footer/>
      <ToastContainer/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
