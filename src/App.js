import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar bg="green" expand="lg">
        <Navbar.Brand href="/home" style={{ padding: 10 }}>Hotelio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/cities">Cities</Nav.Link>
            <Nav.Link href="/accommodation-types">Accommodation Types</Nav.Link>
            <Nav.Link href="/accommodation-facilities">Accommodation Facilities</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/menus">Menus</Nav.Link>
            <Nav.Link href="/RoomType">Dhomat</Nav.Link>
            <Nav.Link href="/VendetTuristike">Vendet Turistike</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;
