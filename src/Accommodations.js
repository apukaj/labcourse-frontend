import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Accommodations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  accommodations: [],
			accommodation: {
        name: '',
        city: '',
        address: '',
        type: '',
        facilities: []
      },
      cities: [],
      types: [],
      facilities: []
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		this.fetchAccommodations()
    this.fetchTypes()
    this.fetchCities()
    this.fetchFacilities()
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
    axios.get('https://localhost:5001/api/accommodationtypes')
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
		const { accommodations } = this.state
    const { name, city, address, type, facilities } = this.state.accommodation
		// if (!type) {
		// 	alert("Please provide a type name!")
		// 	return
		// }

		axios.post('https://localhost:5001/api/accommodations', {
			name,
      city,
      address,
      type,
      facilities
		}).then(response => {
			this.setState({accommodations: [...accommodations, response.data]})
			this.setState({accommodation: {
        name: '',
        city: '',
        address: '',
        type: '',
      }})
		}).catch(error => {
			console.log(error)
		})
	}

	handleDelete(id) {
		const { accommodations } = this.state
		axios.delete(`https://localhost:5001/api/accommodations/${id}`).then(response => {
			this.setState({accommodations: accommodations.filter(accommodation => accommodation.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	render() {
		const { accommodation, accommodations } = this.state
		const { cities, types, facilities } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add accommodation</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={accommodation.name}
								onChange={e => this.setState({
                  accommodation: {
                    ...accommodation,
                    name: e.target.value
                  }
                })}
							/>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>City</Form.Label>
							<Form.Control
								as="select"
								placeholder="City"
								value={accommodation.city}
								onChange={e => this.setState({
                  accommodation: {
                    ...accommodation,
                    city: e.target.value
                  }
                })}
							>
								<option value="" selected>Select</option>
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
								value={accommodation.address}
								onChange={e => this.setState({
                  accommodation: {
                    ...accommodation,
                    address: e.target.value
                  }
                })}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Accommodation type</Form.Label>
							<Form.Control
								as="select"
								placeholder="Type"
								value={accommodation.type}
								onChange={e => this.setState({
                  accommodation: {
                    ...accommodation,
                    type: e.target.value
                  }
                })}
							>
								<option value="" selected>Select</option>
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
							<Form.Label>Accommodation facilities</Form.Label>
							<Form.Control
								as="select"
								placeholder="Facilities"
								multiple
								onChange={e => this.setState({
                  accommodation: {
                    ...accommodation,
                    facilities: [].slice.call(e.target.selectedOptions).map(it=>it.value)
                  }
                })}
							>
								{
									facilities.map(facility =>
										<option key={facility.id} value={facility.name}>
											{facility.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

						<Button variant="primary" type="submit">
							Save accommodation
						</Button>
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
                <th>City</th>
                <th>Address</th>
                <th>Type</th>
                <th>Facilities</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								accommodations.map(acc => <tr key={acc.id}>
									<td>{acc.id}</td>
									<td>{acc.name}</td>
                  <td>{acc.city}</td>
                  <td>{acc.address}</td>
                  <td>{acc.type}</td>
                  <td>{acc.facilities}</td>
									<td><Button variant="warning">Edit</Button></td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(acc.id)}
										>
											Delete
										</Button>
									</td>
								</tr>)
							}
						</tbody>
					</Table>
				</Col>
			</Row>
		</div>
		)
	}
}
export default Accommodations;
