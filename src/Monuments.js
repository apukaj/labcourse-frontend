import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class Monuments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  monuments: [],
		  monument: {
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
		axios.get('https://localhost:5001/api/monuments')
				 .then(response => {
					 this.setState({monuments: response.data})
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
		const { monument, monuments } = this.state

		if (!monument.name) {
			alert("Please provide a name!")
			return
		}

		axios.post('https://localhost:5001/api/monuments', {
			name: monument.name,
			city: monument.city,
      address: monument.address,
			image: monument.image
		}).then(response => {
			this.setState({monuments: [...monuments, response.data]})
			this.setState({monument: {name:'',city:'',address:'',image:''}})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { monuments } = this.state
		axios.delete(`https://localhost:5001/api/monuments/${id}`).then(response => {
			this.setState({monuments: monuments.filter(Vendi => Vendi.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { monument, monuments, editId } = this.state
		axios.put(`https://localhost:5001/api/monuments/${editId}`, {
			id: editId,
			name: monument.name,
			city: monument.city,
			address: monument.address,
			image: monument.image
		}).then(response => {
			const idx = monuments.indexOf(monuments.find(monument => monument.id === editId))
			this.state.monuments[idx].name = monument.name
			this.state.monuments[idx].city = monument.city
			this.state.monuments[idx].address = monument.address
			this.state.monuments[idx].image = monument.image
			this.setState({
				editId: '',
				monument: {
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
		const { monuments } = this.state
		const editMonument = monuments.find(monument => monument.id === id)
		this.setState({ monument: { name: editMonument.name, city: editMonument.city, address: editMonument.address, image: editMonument.image }, editId: id})
	}

	render() {
		const { monument, monuments, cities, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add monument</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={monument.name}
								onChange={e => this.setState({monument: {...monument, name: e.target.value}})}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>City</Form.Label>
							<Form.Control
								as="select"
								placeholder="City"
								value={monument.city}
								onChange={e => this.setState({
                  monument: {
                    ...monument,
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
								value={monument.address}
								onChange={e => this.setState({monument: {...monument, address: e.target.value}})}
							/>
						</Form.Group>

						<Form.Group controlId="image" style={{ marginBottom: 15 }}>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Image url"
								value={monument.image}
								onChange={e => this.setState({monument: {...monument, image: e.target.value}})}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit monument
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', monument: { name: '', location: ''}})}>New Monument</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save monument
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
								monuments.map(monument => <tr key={monument.id}>
									<td>{monument.id}</td>
									<td>{monument.name}</td>
									<td>{monument.city}</td>
									<td>{monument.address}</td>
									<td>
										<a href={monument.image} target="_blank">
											<img height={80} src={monument.image} />
										</a>
									</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(monument.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(monument.id)}
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
export default Monuments;
