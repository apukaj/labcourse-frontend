import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Promotions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  promotions: [],
			promotion: {
        name: '',
        city: '',
        address: '',
        type: '',
				contact: ''
      },
      cities: [],
      types: [],
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		this.fetchPromotions()
    this.fetchTypes()
    this.fetchCities()
	}

  fetchPromotions() {
    axios.get('https://localhost:5001/api/promotions')
				 .then(response => {
					 this.setState({promotions: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchTypes() {
    axios.get('https://localhost:5001/api/businesstypes')
				 .then(response => {
					 this.setState({types: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchCities() {
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
		const { promotions } = this.state
    const { name, city, address, type, contact } = this.state.promotion
		// if (!type) {
		// 	alert("Please provide a type name!")
		// 	return
		// }

		axios.post('https://localhost:5001/api/promotions', {
			name,
      city,
      address,
      type,
			contact
		}).then(response => {
			this.setState({promotions: [...promotions, response.data]})
			this.setState({promotion: {
        name: '',
        city: '',
        address: '',
        type: '',
				contact: ''
      }})
		}).catch(error => {
			console.log(error)
		})
	}

	handleDelete(id) {
		const { promotions } = this.state
		axios.delete(`https://localhost:5001/api/promotions/${id}`).then(response => {
			this.setState({promotions: promotions.filter(promotion => promotion.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { promotion, promotions, editId } = this.state
		axios.put(`https://localhost:5001/api/promotions/${editId}`, {
			id: editId,
			name: promotion.name,
			city: promotion.city,
			address: promotion.address,
			type: promotion.type,
			contact: promotion.contact
		}).then(response => {
			const idx = promotions.indexOf(promotions.find(promotion => promotion.id === editId))
			this.state.promotions[idx].name = promotion.name
			this.state.promotions[idx].city = promotion.city
			this.state.promotions[idx].address = promotion.address
			this.state.promotions[idx].type = promotion.type
			this.state.promotions[idx].contact = promotion.contact
			this.setState({
				editId: '',
				promotion: {
					name: '',
					city: '',
					address: '',
					type: '',
					contact: ''
				}
			})
		}).catch(error => {
			console.log(error)
		})
	}

	handleEditClick(id) {
		const { promotions } = this.state
		const editPromotion = promotions.find(promotion => promotion.id === id)
		this.setState({
			promotion: {
				name: editPromotion.name,
				city: editPromotion.city,
				address: editPromotion.address,
				type: editPromotion.type,
				contact: editPromotion.contact
			}, 
			editId: id
		})
	}

	render() {
		const { promotion, promotions, editId } = this.state
		const { cities, types } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add promotion</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={promotion.name}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    name: e.target.value
                  }
                })}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Business type</Form.Label>
							<Form.Control
								as="select"
								placeholder="Type"
								value={promotion.type}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    type: e.target.value
                  }
                })}
							>
								<option value="" defaultValue>Select</option>
								{
									types.map(type =>
										<option key={type.id} value={type.name}>
											{type.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>City</Form.Label>
							<Form.Control
								as="select"
								placeholder="City"
								value={promotion.city}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
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
								value={promotion.address}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    address: e.target.value
                  }
                })}
							/>
						</Form.Group>

						<Form.Group controlId="image" style={{ marginBottom: 15 }}>
							<Form.Label>Contact</Form.Label>
							<Form.Control
								type="text"
								placeholder="Phone or email"
								value={promotion.contact}
								onChange={e => this.setState({
                  promotion: {
                    ...promotion,
                    contact: e.target.value
                  }
                })}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit promotion
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', promotion: { name: '', city: '', address: '', type: '', facilities: []}})}>New Promotion</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save promotion
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
                <th>Type</th>
                <th>Contact</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								promotions.map(prom => <tr key={prom.id}>
									<td>{prom.id}</td>
									<td>{prom.name}</td>
                  <td>{prom.city}</td>
                  <td>{prom.address}</td>
                  <td>{prom.type}</td>
                  <td>{prom.contact}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(prom.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(prom.id)}
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
export default Promotions;
