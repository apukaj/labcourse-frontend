import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class RestaurantTypes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  restaurants: [],
			restaurant: '',
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/restauranttypes')
				 .then(response => {
					 this.setState({restaurants: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { restaurant, restaurants } = this.state

		if (!restaurant) {
			alert("Please provide a type name!")
			return
		}

		axios.post('https://localhost:5001/api/restauranttypes', {
			name: restaurant
		}).then(response => {
			this.setState({restaurants: [...restaurants, response.data]})
			this.setState({restaurant: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { restaurants } = this.state
		axios.delete(`https://localhost:5001/api/restauranttypes/${id}`).then(response => {
			this.setState({restaurants: restaurants.filter(restaurant => restaurant.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { restaurant, restaurants, editId } = this.state
		axios.put(`https://localhost:5001/api/restauranttypes/${editId}`, {
			id: editId,
			name: restaurant
		}).then(response => {
			const idx = restaurants.indexOf(restaurants.find(restaurant => restaurant.id === editId))
			this.state.restaurants[idx].name = restaurant
			this.setState({
				editId: '',
				restaurant: ''
			})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditClick(id) {
		const { restaurants } = this.state
		const editRestaurant = restaurants.find(restaurant => restaurant.id === id)
		this.setState({restaurant: editRestaurant.name, editId: id})
	}

	render() {
		const { restaurant, restaurants, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add restaurant type</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Restaurant type</Form.Label>
							<Form.Control
								type="text"
								placeholder="Restaurant type"
								value={restaurant}
								onChange={e => this.setState({restaurant: e.target.value})}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit type
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', restaurant: ''})}>New Type</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save type
							</Button>
						}
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Type</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								restaurants.map(restaurant => <tr key={restaurant.id}>
									<td>{restaurant.id}</td>
									<td>{restaurant.name}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(restaurant.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(restaurant.id)}
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
export default RestaurantTypes;
