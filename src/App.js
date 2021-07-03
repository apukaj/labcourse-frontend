import './App.css';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
		  showHero: false,
      showNavbar: true,
      showAdminNavbar: false
		}
	}

  componentDidMount() {
    if (this.props.history.location.pathname.startsWith("/admin")) {
      this.setState({showAdminNavbar: true, showNavbar: false})
      if (!localStorage.getItem("token")) {
        window.location = "/login"
      }
    }
    if (this.props.history.location.pathname === '/') {
      this.setState({showHero: true})
    }
  }

  render() {
    const { showHero, showNavbar, showAdminNavbar } = this.state
    return (
      <div className="App">
        {
          showAdminNavbar ? <Navbar bg="green" expand="lg">
            <Navbar.Brand href="/" style={{ padding: 10 }}>Kosovo Trip</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/" onClick={() => {
                  localStorage.removeItem("token")
                }}>Logout</Nav.Link>
                <Nav.Link href="/admin/cities">Cities</Nav.Link>
                <Nav.Link href="/admin/menus">Menus</Nav.Link>
                <Nav.Link href="/admin/restaurant-types">Restaurant Types</Nav.Link>
                <Nav.Link href="/admin/restaurants">Restaurants</Nav.Link>
                <Nav.Link href="/admin/accommodation-types">Accommodation Types</Nav.Link>
                <Nav.Link href="/admin/accommodation-facilities">Accommodation Facilities</Nav.Link>
                <Nav.Link href="/admin/accommodations">Accommodations</Nav.Link>
                <Nav.Link href="/admin/rooms">Rooms</Nav.Link>
                <Nav.Link href="/admin/places">Places</Nav.Link>
                <Nav.Link href="/admin/monuments">Monuments</Nav.Link>    
                <Nav.Link href="/admin/nature">Nature</Nav.Link>
                <Nav.Link href="/admin/business-types">Business Types</Nav.Link>
                <Nav.Link href="/admin/promotions">Promotions</Nav.Link>
                <Nav.Link href="/admin/shopping-facilities">Shopping Facilities</Nav.Link>
                <Nav.Link href="/admin/shopping">Shopping</Nav.Link>
                <Nav.Link href="/admin/accommodation-reservations">Accommodation Reservations</Nav.Link>
                <Nav.Link href="/admin/restaurant-reservations">Restaurant Reservations</Nav.Link>
                <Nav.Link href="/admin/gallery">Gallery</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> : null
        }
        {
          showNavbar ? <Navbar className="visitor-navigation">
            <Navbar.Brand href="/" style={{ padding: 10 }}>KOSOVO TRIP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link style={{ margin: '0 5px' }} href="/hotels">Hotels</Nav.Link>
                <Nav.Link style={{ margin: '0 5px' }} href="/restaurants">Restaurants</Nav.Link>
                <Nav.Link style={{ margin: '0 5px' }} href="/nature">Things to do</Nav.Link>
                <Nav.Link style={{ margin: '0 5px' }} href="/list">My List</Nav.Link>
                <Nav.Link style={{ margin: '0 5px' }} href="/gallery">Gallery</Nav.Link>
                <Nav.Link style={{ margin: '0 5px' }} href="/promotions">Promotions</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link style={{ margin: '0 15px' }} href="/login">Admin</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> : null
        }
        {
          showHero ? <div className="home-hero">
            <h1 style={{ fontSize: '120px' }}>KOSOVO TRIP</h1>
            <p style={{ fontSize: '30px' }}>Make your trip unforgettable!</p>
            <div style={{ width: '50%', display: 'flex', margin: '0 auto', justifyContent: 'center' }}>
              <a style={{ margin: '0 10px' }} href="/hotels" class="btn btn-primary" role="button">Hotels</a>
              <a style={{ margin: '0 10px' }} href="/restaurants" class="btn btn-primary" role="button">Restaurants</a>
              <a style={{ margin: '0 10px' }} href="/nature" class="btn btn-primary" role="button">Places</a>
            </div>
          </div> : null
        }
      </div>
    );
  }
}


export default App;
