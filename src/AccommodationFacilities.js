import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class AccommodationFacilities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  facilities: [],
			facility: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:44333/api/accommodationfacilities')
				 .then(response => {
					 this.setState({facilities: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { facility, facilities } = this.state

		if (!facility) {
			alert("Please provide a facility name!")
			return
		}

		axios.post('https://localhost:44333/api/accommodationfacilities', {
			name: facility
		}).then(response => {
			this.setState({facilities: [...facilities, response.data]})
			this.setState({facility: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { facilities } = this.state
		axios.delete(`https://localhost:44333/api/accommodationfacilities/${id}`).then(response => {
			this.setState({facilities: facilities.filter(facility => facility.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	render() {
		const { facility, facilities } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add facility</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Facility name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Facility name"
								value={facility}
								onChange={e => this.setState({facility: e.target.value})}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Save facility
						</Button>
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Facility</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								facilities.map(facility => <tr key={facility.id}>
									<td>{facility.id}</td>
									<td>{facility.name}</td>
									<td><Button variant="warning">Edit</Button></td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(facility.id)}
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
export default AccommodationFacilities;
