import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './components/Product';
import PageNotFound from './pages/PageNotFound';
import Admin from './components/Admin/Admin'
import AddProducts from './components/Admin/AddProducts';
import ViewProducts from './components/Admin/ViewProducts';
import ProductDetails from './components/ProductDetails';
import ViewUsers from './components/ViewUsers';
import Cart from './components/Cart';
import CheckoutDetails from './CheckoutDetails';
import Checkout from './components/Checkout';
import CheckoutForms from './components/CheckoutForms';
import CheckoutSuccess from './components/CheckoutSuccess';
import MyOrders from './components/MyOrders';
import Orders from './components/Admin/Orders';
import Navbar from './components/Navbar';
import OrderDetails from './components/Admin/OrderDetails';




function App() {
  return (
    <div>
    <ToastContainer autoClose={2000} position="top-center"/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/> 
      <Route path='/admin' element={<Admin/>}>
      <Route path='addproduct' element={<AddProducts/>}/>
      <Route path='viewproducts' element={<ViewProducts/>}/>
      <Route path='viewusers' element={<ViewUsers/>}/>
      <Route path='edit/:id' element={<AddProducts/>}/>
      <Route path='orders' element={<Orders/>}/>
      <Route path='order-details/:id' element={<OrderDetails/>}/>



        </Route>      
        <Route path='/productdetails/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkoutDetails' element={<CheckoutDetails/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/checkoutForm' element={<CheckoutForms/>}/>
        <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>

        <Route path='*' element={<PageNotFound/>}/>


    </Routes>
    {/* <Footer/> */}
     
    </div>
  );
}

export default App