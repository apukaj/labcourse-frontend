import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Restaurants extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  restaurants: [],
			restaurant: {
        name: '',
        city: '',
        address: '',
        type: '',
        menus: []
      },
      cities: [],
      types: [],
      menus: [],
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		this.fetchRestaurants()
    this.fetchTypes()
    this.fetchCities()
    this.fetchMenus()
	}

  fetchRestaurants() {
    axios.get('https://localhost:5001/api/restaurants')
				 .then(response => {
					 this.setState({restaurants: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchTypes() {
    axios.get('https://localhost:5001/api/restauranttypes')
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

  fetchMenus() {
    axios.get('https://localhost:5001/api/menus')
				 .then(response => {
					 this.setState({menus: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

	handleSubmit(e) {
		e.preventDefault()
		const { restaurants } = this.state
    const { name, city, address, type, menus } = this.state.restaurant
		// if (!type) {
		// 	alert("Please provide a type name!")
		// 	return
		// }

		axios.post('https://localhost:5001/api/restaurants', {
			name,
      city,
      address,
      type,
      menus
		}).then(response => {
			this.setState({restaurants: [...restaurants, response.data]})
			this.setState({restaurant: {
        name: '',
        city: '',
        address: '',
        type: '',
        menus: []
      }})
		}).catch(error => {
			console.log(error)
		})
	}

	handleDelete(id) {
		const { restaurants } = this.state
		axios.delete(`https://localhost:5001/api/restaurants/${id}`).then(response => {
			this.setState({restaurants: restaurants.filter(restaurant => restaurant.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { restaurant, restaurants, editId } = this.state
		axios.put(`https://localhost:5001/api/restaurants/${editId}`, {
			id: editId,
			name: restaurant.name,
			city: restaurant.city,
			address: restaurant.address,
			type: restaurant.type,
			menus: restaurant.menus
		}).then(response => {
			const idx = restaurants.indexOf(restaurants.find(restaurant => restaurant.id === editId))
			this.state.restaurant[idx].name = restaurant.name
			this.state.restaurant[idx].city = restaurant.city
			this.state.restaurant[idx].address = restaurant.address
			this.state.restaurant[idx].type = restaurant.type
			this.state.restaurant[idx].menus = restaurant.menus
			this.setState({
				editId: '',
				restaurant: {
					name: '',
					city: '',
					address: '',
					type: '',
					menus: []
				}
			})
		}).catch(error => {
			console.log(error)
		})
	}

	handleEditClick(id) {
		const { restaurants } = this.state
		const editRestaurant = restaurants.find(restaurant => restaurant.id === id)
		this.setState({
			restaurant: {
				name: editRestaurant.name,
				city: editRestaurant.city,
				address: editRestaurant.address,
				type: editRestaurant.type,
				menus: editRestaurant.menus
			}, 
			editId: id
		})
	}

	render() {
		const { restaurant, restaurants, editId } = this.state
		const { cities, types, menus } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add restaurant</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={restaurant.name}
								onChange={e => this.setState({
                  restaurant: {
                    ...restaurant,
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
								value={restaurant.city}
								onChange={e => this.setState({
                  restaurant: {
                    ...restaurant,
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
								value={restaurant.address}
								onChange={e => this.setState({
                  restaurant: {
                    ...restaurant,
                    address: e.target.value
                  }
                })}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Restaurant type</Form.Label>
							<Form.Control
								as="select"
								placeholder="Type"
								value={restaurant.type}
								onChange={e => this.setState({
                  restaurant: {
                    ...restaurant,
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
							<Form.Label>Restaurant menus</Form.Label>
							<Form.Control
								as="select"
								placeholder="Facilities"
								multiple
								onChange={e => this.setState({
                  restaurant: {
                    ...restaurant,
                    menus: [].slice.call(e.target.selectedOptions).map(it=>it.value)
                  }
                })}
							>
								{
									menus.map(menu =>
										<option key={menu.id} value={menu.name}>
											{menu.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit restaurant
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', restaurant: { name: '', city: '', address: '', type: '', menus: []}})}>New Restaurant</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save restaurant
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
                <th>Type</th>
                <th>Menus</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								restaurants.map(rest => <tr key={rest.id}>
									<td>{rest.id}</td>
									<td>{rest.name}</td>
                  <td>{rest.city}</td>
                  <td>{rest.address}</td>
                  <td>{rest.type}</td>
                  <td>{(rest.menus || []).join(', ')}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(rest.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(rest.id)}
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
export default Restaurants;
