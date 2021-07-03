import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class Caves extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  caves: [],
		  cave: {
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
		axios.get('https://localhost:5001/api/caves')
				 .then(response => {
					 this.setState({caves: response.data})
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
		const { cave, caves } = this.state

		if (!cave.name) {
			alert("Please provide a name!")
			return
		}

		axios.post('https://localhost:5001/api/caves', {
			name: cave.name,
			city: cave.city,
      address: cave.address,
			image: cave.image
		}).then(response => {
			this.setState({caves: [...caves, response.data]})
			this.setState({cave: {name:'',city:'',address:'', image: ''}})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { caves } = this.state
		axios.delete(`https://localhost:5001/api/caves/${id}`).then(response => {
			this.setState({caves: caves.filter(Vendi => Vendi.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { cave, caves, editId } = this.state
		axios.put(`https://localhost:5001/api/caves/${editId}`, {
			id: editId,
			name: cave.name,
			city: cave.city,
			address: cave.address,
			image: cave.image
		}).then(response => {
			const idx = caves.indexOf(caves.find(cave => cave.id === editId))
			this.state.caves[idx].name = cave.name
			this.state.caves[idx].city = cave.city
			this.state.caves[idx].address = cave.address
			this.state.caves[idx].image = cave.image
			this.setState({
				editId: '',
				cave: {
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
		const { caves } = this.state
		const editCave = caves.find(cave => cave.id === id)
		this.setState({ cave: { name: editCave.name, city: editCave.city, address: editCave.address, image: editCave.image }, editId: id})
	}

	render() {
		const { cave, caves, cities, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add cave</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={cave.name}
								onChange={e => this.setState({cave: {...cave, name: e.target.value}})}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>City</Form.Label>
							<Form.Control
								as="select"
								placeholder="City"
								value={cave.city}
								onChange={e => this.setState({
                  cave: {
                    ...cave,
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
								value={cave.address}
								onChange={e => this.setState({cave: {...cave, address: e.target.value}})}
							/>
						</Form.Group>

						<Form.Group controlId="image" style={{ marginBottom: 15 }}>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Image url"
								value={cave.image}
								onChange={e => this.setState({
                  cave: {
                    ...cave,
                    image: e.target.value
                  }
                })}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit cave
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', cave: { name: '', address: ''}})}>New Cave</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save cave
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
								caves.map(cave => <tr key={cave.id}>
									<td>{cave.id}</td>
									<td>{cave.name}</td>
									<td>{cave.city}</td>
									<td>{cave.address}</td>
									<td>
										<a href={cave.image} target="_blank">
											<img height={80} src={cave.image} />
										</a>
									</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(cave.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(cave.id)}
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
export default Caves;
