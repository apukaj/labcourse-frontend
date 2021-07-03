import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { Container } from 'react-bootstrap';

class VisitorsRestaurant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  restaurant: '',
      displayReservationForm: false
		}
	}

	componentDidMount() {
		this.fetchRestaurant(this.props.match.params.id)
	}

  fetchRestaurant(id) {
    axios.get(`https://localhost:5001/api/restaurants/${id}`)
				 .then(response => {
					 this.setState({restaurant: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

	render() {
		const { restaurant, displayReservationForm } = this.state
		return (
		<div className="visitors-container">
      <Container>
      <Row>
        <Col>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address} - {restaurant.city}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <img width={800} src={restaurant.image} />
        </Col>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam risus ipsum, viverra id ante et, eleifend iaculis dolor. Sed tempus dapibus nunc et dignissim. Donec suscipit pellentesque sem, eget consequat turpis bibendum at. Aenean ut pharetra risus. Integer ultrices neque eu diam elementum fermentum. Morbi convallis aliquam nibh vulputate tincidunt. Fusce sollicitudin iaculis sem, et dapibus enim porta vitae. Vivamus sed felis vel risus mattis laoreet.</p>
        <p>Aliquam a risus sagittis nibh commodo tempor vel ac justo. Nulla euismod massa id sem imperdiet consectetur. Ut tempor mi vel tellus hendrerit, id mollis elit maximus. Nulla malesuada aliquam augue, vitae aliquet ipsum ornare eu. Quisque imperdiet consequat est vehicula condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras facilisis purus id quam sodales sagittis et non arcu. Aenean rutrum malesuada libero, molestie faucibus enim interdum non. Suspendisse aliquam orci sit amet ante iaculis, sed eleifend erat imperdiet. Cras quis porta dui.</p>
      </Row>
      {
        displayReservationForm ? <Row style={{ width: '50%', margin: '0 auto', textAlign: 'left'}}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
							/>
						</Form.Group>
            <Form.Group controlId="contact" style={{ marginBottom: 15 }}>
							<Form.Label>Contact</Form.Label>
							<Form.Control
								type="text"
								placeholder="Phone or email"
							/>
						</Form.Group>
						<Form.Group controlId="count" style={{ marginBottom: 15 }}>
							<Form.Label>Nr. of guests</Form.Label>
							<Form.Control
								type="number"
								placeholder="Nr. of guests"
							/>
						</Form.Group>
            <Form.Group controlId="date" style={{ marginBottom: 15 }}>
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="text"
								placeholder="Date"
							/>
						</Form.Group>
            <Form.Group controlId="time" style={{ marginBottom: 15 }}>
							<Form.Label>Time</Form.Label>
							<Form.Control
								type="text"
								placeholder="Time"
							/>
						</Form.Group>
          </Form>
        </Row> : null
      }
      <Row>
        <Col>
          {
            displayReservationForm
              ? <Button onClick={() => {
                Storage.prototype.setObj = function(key, obj) {
                  return this.setItem(key, JSON.stringify(obj))
                }
                Storage.prototype.getObj = function(key) {
                    return JSON.parse(this.getItem(key))
                }
                let list = localStorage.getObj('kosovotrip-list') || []
                let found = list.find(x => x.type === 'restaurant' && x.name === restaurant.name)
                if (!found) {
                  list.push({type: 'Restaurant (reservation)', name: restaurant.name, city: restaurant.city, address: restaurant.address})
                }
                localStorage.setObj('kosovotrip-list', list)
                alert('Thank you for your reservation!')
              }}>Submit</Button>
              : <Button onClick={() => this.setState({displayReservationForm: true})}>Make online reservation</Button>
          }
        </Col>
      </Row>
      </Container>
		</div>
		)
	}
}

export default VisitorsRestaurant;
