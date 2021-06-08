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
        location: ''
      }
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/parks')
				 .then(response => {
					 this.setState({parks: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
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
      location: park.location
		}).then(response => {
			this.setState({parks: [...parks, response.data]})
			this.setState({park: {name:'',location:''}})
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

	render() {
		const { park, parks } = this.state
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
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								placeholder="Location"
								value={park.location}
								onChange={e => this.setState({park: {...park, location: e.target.value}})}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Save park
						</Button>
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
                <th>Location</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								parks.map(park => <tr key={park.id}>
									<td>{park.id}</td>
									<td>{park.name}</td>
									<td>{park.location}</td>
									<td><Button variant="warning">Edit</Button></td>
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
