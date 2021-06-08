import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'


class Cities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  cities: [],
			city: '',
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/cities')
				 .then(response => {
					 this.setState({cities: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { city, cities } = this.state

		if (!city) {
			alert("Please provide a city name!")
			return
		}

		axios.post('https://localhost:5001/api/cities', {
			name: city
		}).then(response => {
			this.setState({cities: [...cities, response.data]})
			this.setState({city: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { cities } = this.state
		axios.delete(`https://localhost:5001/api/cities/${id}`).then(response => {
			this.setState({cities: cities.filter(city => city.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { city, cities, editId } = this.state
		axios.put(`https://localhost:5001/api/cities/${editId}`, {
			id: editId,
			name: city
		}).then(response => {
			const idx = cities.indexOf(cities.find(city => city.id === editId))
			this.state.cities[idx].name = city
			this.setState({
				editId: '',
				city: ''
			})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditClick(id) {
		const { cities } = this.state
		const editCity = cities.find(city => city.id === id)
		this.setState({city: editCity.name, editId: id})
	}

	render() {
		const { city, cities, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add City</h1>
					<Form>
						<Form.Group controlId="formBasicEmail" style={{ marginBottom: 15 }}>
							<Form.Label>City name</Form.Label>
							<Form.Control
								type="text"
								placeholder="City name"
								value={city}
								onChange={e => this.setState({city: e.target.value})}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit city
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', city: ''})}>New City</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save city
							</Button>
						}
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>City</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								cities.map(city => <tr key={city.id}>
									<td>{city.id}</td>
									<td>{city.name}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(city.id)}>
											Edit
										</Button></td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(city.id)}
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
export default Cities;
