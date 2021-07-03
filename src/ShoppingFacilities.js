import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class ShoppingFacilities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  facilities: [],
			facility: '',
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/shoppingfacilities')
				 .then(response => {
					 this.setState({facilities: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { facility, facilities } = this.state

		if (!facility) {
			alert("Please provide a facility name!")
			return
		}

		axios.post('https://localhost:5001/api/shoppingfacilities', {
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
		axios.delete(`https://localhost:5001/api/shoppingfacilities/${id}`).then(response => {
			this.setState({facilities: facilities.filter(facility => facility.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { facility, facilities, editId } = this.state
		axios.put(`https://localhost:5001/api/shoppingfacilities/${editId}`, {
			id: editId,
			name: facility
		}).then(response => {
			const idx = facilities.indexOf(facilities.find(facility => facility.id === editId))
			this.state.facilities[idx].name = facility
			this.setState({
				editId: '',
				facility: ''
			})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditClick(id) {
		const { facilities } = this.state
		const editFacility = facilities.find(facility => facility.id === id)
		this.setState({facility: editFacility.name, editId: id})
	}s

	render() {
		const { facility, facilities, editId } = this.state
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

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit facility
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', facility: ''})}>New Facility</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save facility
							</Button>
						}
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
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(facility.id)}>
											Edit
										</Button>
									</td>
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
export default ShoppingFacilities;
