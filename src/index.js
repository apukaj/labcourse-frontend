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
import ShoppingFacilities from './ShoppingFacilities'
import Shopping from './Shopping'
import Promotions from './Promotions'
import AccommodationReservations from './AccommodationReservations'
import RestaurantReservations from './RestaurantReservations'
import Gallery from './Galleries'

import VisitorsNature from './Visitors/Nature'
import VisitorsPark from './Visitors/Park'
import VisitorsCave from './Visitors/Cave'
import VisitorsMonument from './Visitors/Monument'
import VisitorsHotels from './Visitors/Hotels'
import VisitorsHotel from './Visitors/Hotel'
import VisitorsRestaurants from './Visitors/Restaurants'
import VisitorsRestaurant from './Visitors/Restaurant'
import VisitorsShopping from './Visitors/Shopping'
import VisitorsList from './Visitors/List'
import VisitorsGallery from './Visitors/Gallery'
import VisitorsPromotions from './Visitors/Promotions'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={App} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/admin/cities" component={Cities} />
    <Route path="/admin/restaurant-types" component={RestaurantTypes} />
    <Route path="/admin/restaurants" component={Restaurants} />
    <Route path="/admin/accommodation-types" component={AccommodationTypes} />
    <Route path="/admin/accommodation-facilities" component={AccommodationFacilities} />
    <Route path="/admin/accommodations" component={Accommodations} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/admin/menus" component={Menu} />
    <Route path="/admin/rooms" component={RoomType} />
    <Route path="/admin/places" component={VendetTuristike} />
    <Route path="/admin/monuments" component={Monuments} />
    <Route path="/admin/nature" component={Nature} />
    <Route path="/admin/business-types" component={BusinessTypes} />
    <Route path="/admin/promotions" component={Promotions} />
    <Route path="/admin/shopping-facilities" component={ShoppingFacilities} />
    <Route path="/admin/shopping" component={Shopping} />
    <Route path="/admin/accommodation-reservations" component={AccommodationReservations} />
    <Route path="/admin/restaurant-reservations" component={RestaurantReservations} />
    <Route path="/admin/gallery" component={Gallery} />

    <Route path="/nature" component={VisitorsNature} />
    <Route path="/hotels" component={VisitorsHotels} />
    <Route path="/restaurants" component={VisitorsRestaurants} />
    <Route path="/park/:id" component={VisitorsPark} />
    <Route path="/monument/:id" component={VisitorsMonument} />
    <Route path="/cave/:id" component={VisitorsCave} />
    <Route path="/hotel/:id" component={VisitorsHotel} />
    <Route path="/restaurant/:id" component={VisitorsRestaurant} />
    <Route path="/shopping/:id" component={VisitorsShopping} />
    <Route path="/list" component={VisitorsList} />
    <Route path="/gallery" component={VisitorsGallery} />
    <Route path="/promotions" component={VisitorsPromotions} />

  </BrowserRouter>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
