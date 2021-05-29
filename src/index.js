import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import Register from './Register';
import Cities from './Cities';
import Menu from './Menu';
import AccommodationTypes from './AccommodationTypes';
import AccommodationFacilities from './AccommodationFacilities'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={App} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/cities" component={Cities} />
    <Route path="/accommodation-types" component={AccommodationTypes} />
    <Route path="/accommodation-facilities" component={AccommodationFacilities} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/menus" component={Menu} />
  </BrowserRouter>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
