import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class AccommodationTypes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  types: [],
			type: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/accommodationtypes')
				 .then(response => {
					 this.setState({types: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { type, types } = this.state

		if (!type) {
			alert("Please provide a type name!")
			return
		}

		axios.post('https://localhost:5001/api/accommodationtypes', {
			name: type
		}).then(response => {
			this.setState({types: [...types, response.data]})
			this.setState({type: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { types } = this.state
		axios.delete(`https://localhost:5001/api/accommodationtypes/${id}`).then(response => {
			this.setState({types: types.filter(type => type.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	render() {
		const { type, types } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add accommodation type</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Accommodation type</Form.Label>
							<Form.Control
								type="text"
								placeholder="Accommodation type"
								value={type}
								onChange={e => this.setState({type: e.target.value})}
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
								types.map(type => <tr key={type.id}>
									<td>{type.id}</td>
									<td>{type.name}</td>
									<td><Button variant="warning">Edit</Button></td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(type.id)}
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
export default AccommodationTypes;
