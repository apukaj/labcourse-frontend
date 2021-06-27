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
import RoomType from './RoomType';
import VendetTuristike from './VendetTuristike';
import AccommodationTypes from './AccommodationTypes';
import AccommodationFacilities from './AccommodationFacilities'
import Accommodations from './Accommodations'
import RestaurantTypes from './RestarantTypes'
import Restaurants from './Restaurants'
import Monuments from './Monuments'
import Nature from './Nature'
import BusinessTypes from './BusinessTypes'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={App} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/cities" component={Cities} />
    <Route path="/restaurant-types" component={RestaurantTypes} />
    <Route path="/restaurants" component={Restaurants} />
    <Route path="/accommodation-types" component={AccommodationTypes} />
    <Route path="/accommodation-facilities" component={AccommodationFacilities} />
    <Route path="/accommodations" component={Accommodations} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/menus" component={Menu} />
    <Route path="/rooms" component={RoomType} />
    <Route path="/places" component={VendetTuristike} />
    <Route path="/monuments" component={Monuments} />
    <Route path="/nature" component={Nature} />
    <Route path="/business-types" component={BusinessTypes} />
  </BrowserRouter>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
