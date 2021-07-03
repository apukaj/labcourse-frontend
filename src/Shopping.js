import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Shopping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  shoppings: [],
			shopping: {
        name: '',
        city: '',
        address: '',
        facilities: [],
				image: ''
      },
      cities: [],
      facilities: [],
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		this.fetchShoppings()
    this.fetchCities()
    this.fetchFacilities()
	}

  fetchShoppings() {
    axios.get('https://localhost:5001/api/shoppings')
				 .then(response => {
					 this.setState({shoppings: response.data})
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
    axios.get('https://localhost:5001/api/shoppingfacilities')
				 .then(response => {
					 this.setState({facilities: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

	handleSubmit(e) {
		e.preventDefault()
		const { shoppings } = this.state
    const { name, city, address, image, facilities } = this.state.shopping
		// if (!type) {
		// 	alert("Please provide a type name!")
		// 	return
		// }

		axios.post('https://localhost:5001/api/shoppings', {
			name,
      city,
      address,
      facilities,
			image
		}).then(response => {
			this.setState({shoppings: [...shoppings, response.data]})
			this.setState({shopping: {
        name: '',
        city: '',
        address: '',
				image: ''
      }})
		}).catch(error => {
			console.log(error)
		})
	}

	handleDelete(id) {
		const { shoppings } = this.state
		axios.delete(`https://localhost:5001/api/shoppings/${id}`).then(response => {
			this.setState({shoppings: shoppings.filter(shopping => shopping.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { shopping, shoppings, editId } = this.state
		axios.put(`https://localhost:5001/api/shoppings/${editId}`, {
			id: editId,
			name: shopping.name,
			city: shopping.city,
			address: shopping.address,
			facilities: shopping.facilities,
			image: shopping.image
		}).then(response => {
			const idx = shoppings.indexOf(shoppings.find(shopping => shopping.id === editId))
			this.state.shoppings[idx].name = shopping.name
			this.state.shoppings[idx].city = shopping.city
			this.state.shoppings[idx].address = shopping.address
			this.state.shoppings[idx].facilities = shopping.facilities
			this.state.shoppings[idx].image = shopping.image
			this.setState({
				editId: '',
				shopping: {
					name: '',
					city: '',
					address: '',
					facilities: [],
					image: ''
				}
			})
		}).catch(error => {
			console.log(error)
		})
	}

	handleEditClick(id) {
		const { shoppings } = this.state
		const editShopping = shoppings.find(shopping => shopping.id === id)
		this.setState({
			shopping: {
				name: editShopping.name,
				city: editShopping.city,
				address: editShopping.address,
				facilities: editShopping.facilities,
				image: editShopping.image
			}, 
			editId: id
		})
	}

	render() {
		const { shopping, shoppings, editId } = this.state
		const { cities, facilities } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add shopping</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={shopping.name}
								onChange={e => this.setState({
                  shopping: {
                    ...shopping,
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
								value={shopping.city}
								onChange={e => this.setState({
                  shopping: {
                    ...shopping,
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
								value={shopping.address}
								onChange={e => this.setState({
                  shopping: {
                    ...shopping,
                    address: e.target.value
                  }
                })}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Shopping facilities</Form.Label>
							<Form.Control
								as="select"
								placeholder="Facilities"
								multiple
								onChange={e => this.setState({
                  shopping: {
                    ...shopping,
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

						<Form.Group controlId="image" style={{ marginBottom: 15 }}>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Image url"
								value={shopping.image}
								onChange={e => this.setState({
                  shopping: {
                    ...shopping,
                    image: e.target.value
                  }
                })}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit shopping
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', shopping: { name: '', city: '', address: '', type: '', facilities: []}})}>New Shopping</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save shopping
							</Button>
						}
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
                <th>Facilities</th>
								<th>Image</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								shoppings.map(acc => <tr key={acc.id}>
									<td>{acc.id}</td>
									<td>{acc.name}</td>
                  <td>{acc.city}</td>
                  <td>{acc.address}</td>
                  <td>{acc.facilities}</td>
									<td>
										<a href={acc.image} target="_blank">
											<img height={80} src={acc.image} />
										</a>
									</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(acc.id)}>
											Edit
										</Button>
									</td>
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
export default Shopping;
