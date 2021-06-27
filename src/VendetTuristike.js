import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class VendetTuristike extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  VendetTuristike: [],
		  Vendi: {
              name: '',
              location: ''
          },
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/VendetTuristike')
				 .then(response => {
					 this.setState({VendetTuristike: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { Vendi, VendetTuristike } = this.state

		if (!Vendi.name) {
			alert("Please provide a name!")
			return
		}

		axios.post('https://localhost:5001/api/VendetTuristike', {
			name: Vendi.name,
            location: Vendi.location
		}).then(response => {
			this.setState({VendetTuristike: [...VendetTuristike, response.data]})
			this.setState({Vendi: {name:'',location:''}})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { VendetTuristike } = this.state
		axios.delete(`https://localhost:5001/api/VendetTuristike/${id}`).then(response => {
			this.setState({VendetTuristike: VendetTuristike.filter(Vendi => Vendi.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { Vendi, VendetTuristike, editId } = this.state
		axios.put(`https://localhost:5001/api/VendetTuristike/${editId}`, {
			id: editId,
			name: Vendi.name,
			location: Vendi.location
		}).then(response => {
			const idx = VendetTuristike.indexOf(VendetTuristike.find(Vendi => Vendi.id === editId))
			this.state.VendetTuristike[idx].name = Vendi.name
			this.state.VendetTuristike[idx].location = Vendi.location
			this.setState({
				editId: '',
				Vendi: {
					name: '',
					location: ''
				}
			})
		}).catch(error => {
			console.log(error)
		})
	}

	handleEditClick(id) {
		const { VendetTuristike } = this.state
		const editVendi = VendetTuristike.find(Vendi => Vendi.id === id)
		this.setState({ Vendi: { name: editVendi.name, location: editVendi.location}, editId: id})
	}

	render() {
		const { Vendi, VendetTuristike, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add place</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								value={Vendi.name}
								onChange={e => this.setState({Vendi: {...Vendi, name: e.target.value}})}
							/>
						</Form.Group>

                        <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								placeholder="Location"
								value={Vendi.location}
								onChange={e => this.setState({Vendi: {...Vendi, location: e.target.value}})}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit place
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', Vendi: { name: '', location: ''}})}>New Place</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save place
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
                                <th>Location</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								VendetTuristike.map(vendi => <tr key={vendi.id}>
									<td>{vendi.id}</td>
									<td>{vendi.name}</td>
									<td>{vendi.location}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(vendi.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(vendi.id)}
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
export default VendetTuristike;
