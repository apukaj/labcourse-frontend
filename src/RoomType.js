import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class RoomTypes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  rooms: [],
			room: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/Room')
				 .then(response => {
					 this.setState({rooms: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { room, rooms } = this.state

		if (!room) {
			alert("Please provide a type name!")
			return
		}

		axios.post('https://localhost:5001/api/Room', {
			name: room
		}).then(response => {
			this.setState({rooms: [...rooms, response.data]})
			this.setState({room: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { rooms } = this.state
		axios.delete(`https://localhost:5001/api/Room/${id}`).then(response => {
			this.setState({rooms: rooms.filter(room => room.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	render() {
		const { room, rooms } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add room type</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Room type</Form.Label>
							<Form.Control
								type="text"
								placeholder="Room type"
								value={room}
								onChange={e => this.setState({room: e.target.value})}
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
								rooms.map(room => <tr key={room.id}>
									<td>{room.id}</td>
									<td>{room.name}</td>
									<td><Button variant="warning">Edit</Button></td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(room.id)}
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
export default RoomTypes;
