import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import About from './page/About';
import Login from './page/login';
import NewProduct from './page/newProduct';
import Signup from './page/Register';
import {store} from './redux/index';
import {Provider} from 'react-redux';
import UserProducts from "./page/userProducts"
import PurchasedProducts from './page/purchasedProducts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
        <Route index element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='newProduct' element={<NewProduct/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path="user-products" element={<UserProducts />} />
        <Route path="purchased-products" element={<PurchasedProducts/>}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
