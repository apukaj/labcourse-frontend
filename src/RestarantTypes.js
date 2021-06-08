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
			restaurant: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
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

	render() {
		const { restaurant, restaurants } = this.state
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

						<Button variant="primary" type="submit">
							Save type
						</Button>
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
									<td><Button variant="warning">Edit</Button></td>
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
