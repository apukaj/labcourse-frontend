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
        location: ''
      }
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/caves')
				 .then(response => {
					 this.setState({caves: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
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
      location: cave.location
		}).then(response => {
			this.setState({caves: [...caves, response.data]})
			this.setState({cave: {name:'',location:''}})
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

	render() {
		const { cave, caves } = this.state
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
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								placeholder="Location"
								value={cave.location}
								onChange={e => this.setState({cave: {...cave, location: e.target.value}})}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Save cave
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
								caves.map(cave => <tr key={cave.id}>
									<td>{cave.id}</td>
									<td>{cave.name}</td>
									<td>{cave.location}</td>
									<td><Button variant="warning">Edit</Button></td>
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
