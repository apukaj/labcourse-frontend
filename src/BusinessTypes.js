import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class BusinessTypes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  businesses: [],
			business: '',
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/businesstypes')
				 .then(response => {
					 this.setState({businesses: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { business, businesses } = this.state

		if (!business) {
			alert("Please provide a type name!")
			return
		}

		axios.post('https://localhost:5001/api/businesstypes', {
			name: business
		}).then(response => {
			this.setState({businesses: [...businesses, response.data]})
			this.setState({business: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { businesses } = this.state
		axios.delete(`https://localhost:5001/api/businesstypes/${id}`).then(response => {
			this.setState({businesses: businesses.filter(business => business.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { business, businesses, editId } = this.state
		axios.put(`https://localhost:5001/api/businesstypes/${editId}`, {
			id: editId,
			name: business
		}).then(response => {
			const idx = businesses.indexOf(businesses.find(business => business.id === editId))
			this.state.businesses[idx].name = business
			this.setState({
				editId: '',
				business: ''
			})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditClick(id) {
		const { businesses } = this.state
		const editBusiness = businesses.find(business => business.id === id)
		this.setState({business: editBusiness.name, editId: id})
	}

	render() {
		const { business, businesses, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add business type</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Business type</Form.Label>
							<Form.Control
								type="text"
								placeholder="Business type"
								value={business}
								onChange={e => this.setState({business: e.target.value})}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit type
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', business: ''})}>New Type</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save type
							</Button>
						}
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
								businesses.map(business => <tr key={business.id}>
									<td>{business.id}</td>
									<td>{business.name}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(business.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(business.id)}
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
export default BusinessTypes;
