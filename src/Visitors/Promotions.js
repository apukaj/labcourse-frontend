import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class VisitorsPromotions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			promotion: {
        name: '',
        city: '',
        address: '',
        type: '',
        contact: ''
      },
      cities: [],
      types: [],
      message: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
    this.fetchTypes()
    this.fetchCities()
	}

  fetchAccommodations() {
    axios.get('https://localhost:5001/api/accommodations')
				 .then(response => {
					 this.setState({accommodations: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchTypes() {
    axios.get('https://localhost:5001/api/businesstypes')
				 .then(response => {
					 this.setState({types: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchCities() {
    axios.get('https://localhost:5001/api/cities')
				 .then(response => {
					 this.setState({cities: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error)
				 })
  }

  fetchFacilities() {
    axios.get('https://localhost:5001/api/accommodationfacilities')
				 .then(response => {
					 this.setState({facilities: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

	handleSubmit(e) {
		e.preventDefault()
		const { message } = this.state
    const { name, city, address, type, contact } = this.state.promotion
		if (!name) {
			alert("Please provide your business name!")
			return
		}

		axios.post('https://localhost:5001/api/promotions', {
			name,
      city,
      address,
      type,
      contact
		}).then(response => {
			this.setState({accommodation: {
        name: '',
        city: '',
        address: '',
        type: '',
				contact: ''
      }})
      this.setState({message: 'We have received your request for being promoted on our site.'})
		}).catch(error => {
      this.setState({message: 'Sorry, something went wrong.'})
			console.log(error)
		})
	}

	render() {
		const { promotion } = this.state
		const { cities, types, message } = this.state
		return (
      <div className="visitors-container">
      <Container style={{ width: '70%', textAlign: 'left'}}>
      <h1 className="places-header">Add your business to our promoted list.</h1>
			<Row>
				<Col>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={promotion.name}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    name: e.target.value
                  }
                })}
							/>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Business type</Form.Label>
							<Form.Control
								as="select"
								placeholder="Type"
								value={promotion.type}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    type: e.target.value
                  }
                })}
							>
								<option value="" defaultValue>Select</option>
								{
									types.map(type =>
										<option key={type.id} value={type.name}>
											{type.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>City</Form.Label>
							<Form.Control
								as="select"
								placeholder="City"
								value={promotion.city}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    city: e.target.value
                  }
                })}
							>
								<option value="" defaultValue>Select</option>
								{
									cities.map(city => 
										<option key={city.id} value={city.name}>
											{city.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								placeholder="Address"
								value={promotion.address}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    address: e.target.value
                  }
                })}
							/>
						</Form.Group>

            <Form.Group controlId="image" style={{ marginBottom: 15 }}>
							<Form.Label>Contact</Form.Label>
							<Form.Control
								type="text"
								placeholder="Phone or email"
								value={promotion.contact}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    contact: e.target.value
                  }
                })}
							/>
						</Form.Group>

            {
              message ? <div style={{ margin: '10px' }}>{message}</div> : null
            }

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Submit promotion
            </Button>
					</Form>
				</Col>
				</Row>
		</Container>
    </div>
		)
	}
}
export default VisitorsPromotions;
