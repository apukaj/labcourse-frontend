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
        location: ''
      }
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/monuments')
				 .then(response => {
					 this.setState({monuments: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
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
      location: monument.location
		}).then(response => {
			this.setState({monuments: [...monuments, response.data]})
			this.setState({monument: {name:'',location:''}})
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

	render() {
		const { monument, monuments } = this.state
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
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								placeholder="Location"
								value={monument.location}
								onChange={e => this.setState({monument: {...monument, location: e.target.value}})}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Save monument
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
								monuments.map(monument => <tr key={monument.id}>
									<td>{monument.id}</td>
									<td>{monument.name}</td>
									<td>{monument.location}</td>
									<td><Button variant="warning">Edit</Button></td>
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
