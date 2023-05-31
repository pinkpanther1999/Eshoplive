
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ProductDetails from './ProductDetails';
import Footer from './Footer';
import Home from './Home';
import LoadCategory from './LoadCategory';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import Cart from './Cart';
import Login from './Login';
import Order from './Order';
import Address from './Address';
import OrderHistory from './OrderHistory';
import PageNotFound from './PageNotFound';



function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />

        </Route>
        <Route path="Home" element={<Home />} />
        <Route path="Order/:id" element={<Order />} />
        <Route path="OrderHistory" element={<OrderHistory />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Cart" element={<Cart />} />
        <Route path="Login" element={<Login />} />
        <Route path="Address" element={<Address />} />
        <Route path="Details/:name" element={<ProductDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
