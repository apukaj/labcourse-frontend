import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class Parks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  parks: [],
		  park: {
        name: '',
				city: '',
        address: '',
				image: ''
      },
			cities: [],
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/parks')
				 .then(response => {
					 this.setState({parks: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })

		axios.get('https://localhost:5001/api/cities')
				 .then(response => {
					 this.setState({cities: response.data})
					 console.log(response)
				 }).catch(error => {
				 	 console.log(error)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { park, parks } = this.state

		if (!park.name) {
			alert("Please provide a name!")
			return
		}

		axios.post('https://localhost:5001/api/parks', {
			name: park.name,
			city: park.city,
      address: park.address,
			image: park.image
		}).then(response => {
			this.setState({parks: [...parks, response.data]})
			this.setState({park: {name:'',city:'',address:'',image:''}})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { parks } = this.state
		axios.delete(`https://localhost:5001/api/parks/${id}`).then(response => {
			this.setState({parks: parks.filter(Vendi => Vendi.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { park, parks, editId } = this.state
		axios.put(`https://localhost:5001/api/parks/${editId}`, {
			id: editId,
			name: park.name,
			city: park.city,
			address: park.address,
			image: park.image
		}).then(response => {
			const idx = parks.indexOf(parks.find(park => park.id === editId))
			this.state.parks[idx].name = park.name
			this.state.parks[idx].city = park.city
			this.state.parks[idx].address = park.address
			this.state.parks[idx].image = park.image
			this.setState({
				editId: '',
				park: {
					name: '',
					city: '',
					address: '',
					image: ''
				}
			})
		}).catch(error => {
			console.log(error)
		})
	}

	handleEditClick(id) {
		const { parks } = this.state
		const editPark = parks.find(park => park.id === id)
		this.setState({ park: { name: editPark.name, city: editPark.city, address: editPark.address, image: editPark.image }, editId: id})
	}

	render() {
		const { park, parks, cities, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add park</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={park.name}
								onChange={e => this.setState({park: {...park, name: e.target.value}})}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>City</Form.Label>
							<Form.Control
								as="select"
								placeholder="City"
								value={park.city}
								onChange={e => this.setState({
                  park: {
                    ...park,
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
								value={park.address}
								onChange={e => this.setState({park: {...park, address: e.target.value}})}
							/>
						</Form.Group>

						<Form.Group controlId="image" style={{ marginBottom: 15 }}>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Image url"
								value={park.image}
								onChange={e => this.setState({park: {...park, image: e.target.value}})}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit park
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', park: { name: '', address: ''}})}>New Park</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save park
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
								<th>Image</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								parks.map(park => <tr key={park.id}>
									<td>{park.id}</td>
									<td>{park.name}</td>
									<td>{park.city}</td>
									<td>{park.address}</td>
									<td>
										<a href={park.image} target="_blank">
											<img height={80} src={park.image} />
										</a>
									</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(park.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(park.id)}
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
export default Parks;
