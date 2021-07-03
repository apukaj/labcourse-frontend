import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class AccommodationReservations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  reservations: [],
			reservation: {
        accommodation: '',
        roomType: '',
        checkIn: '',
        checkOut: ''
      },
      accommodations: [],
      roomTypes: [],
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
    this.fetchReservations()
    this.fetchAccommodations()
    this.fetchRoomTypes()
	}

  fetchReservations() {
    axios.get('https://localhost:5001/api/accommodationreservations')
				 .then(response => {
					 this.setState({reservations: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchAccommodations() {
    axios.get('https://localhost:5001/api/accommodations')
				 .then(response => {
					 this.setState({accommodations: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchRoomTypes() {
    axios.get('https://localhost:5001/api/room')
				 .then(response => {
					 this.setState({roomTypes: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

	handleSubmit(e) {
		e.preventDefault()
		const { reservations } = this.state
    const { accommodation, roomType, checkIn, checkOut } = this.state.reservation
		// if (!type) {
		// 	alert("Please provide a type name!")
		// 	return
		// }

		axios.post('https://localhost:5001/api/accommodationreservations', {
			accommodation,
      roomType,
      checkIn,
      checkOut
		}).then(response => {
			this.setState({reservations: [...reservations, response.data]})
			this.setState({reservation: {
        accommodation: '',
        roomType: '',
        checkIn: '',
        checkOut: ''
      }})
		}).catch(error => {
			console.log(error)
		})
	}

	handleDelete(id) {
		const { reservations } = this.state
		axios.delete(`https://localhost:5001/api/accommodationreservations/${id}`).then(response => {
			this.setState({reservations: reservations.filter(reservation => reservation.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { reservation, reservations, editId } = this.state
		axios.put(`https://localhost:5001/api/accommodationreservations/${editId}`, {
			id: editId,
			accommodation: reservation.accommodation,
			roomType: reservation.roomType,
			checkIn: reservation.checkIn,
			checkOut: reservation.checkOut
		}).then(response => {
			const idx = reservations.indexOf(reservations.find(reservation => reservation.id === editId))
			this.state.reservations[idx].accommodation = reservation.accommodation
			this.state.reservations[idx].roomType = reservation.roomType
			this.state.reservations[idx].checkIn = reservation.checkIn
			this.state.reservations[idx].checkOut = reservation.checkOut
			this.setState({
				editId: '',
				reservation: {
					accommodation: '',
          roomType: '',
          checkIn: '',
          checkOut: ''
				}
			})
		}).catch(error => {
			console.log(error)
		})
	}

	handleEditClick(id) {
		const { reservations } = this.state
		const editReservation = reservations.find(reservation => reservation.id === id)
		this.setState({
			reservation: {
				accommodation: editReservation.accommodation,
				roomType: editReservation.roomType,
				checkIn: editReservation.checkIn,
				checkOut: editReservation.checkOut
			}, 
			editId: id
		})
	}

	render() {
		const { reservation, reservations, editId } = this.state
		const { accommodations, roomTypes } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add reservation</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Accommodation</Form.Label>
							<Form.Control
								as="select"
								placeholder="Type"
								value={reservation.accommodation}
								onChange={e => this.setState({
                  reservation: {
                    ...reservation,
                    accommodation: e.target.value
                  }
                })}
							>
								<option value="" defaultValue>Select</option>
								{
									accommodations.map(acc =>
										<option key={acc.id} value={acc.name}>
											{acc.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Room Type</Form.Label>
							<Form.Control
								as="select"
								placeholder="Type"
								value={reservation.roomType}
								onChange={e => this.setState({
                  reservation: {
                    ...reservation,
                    roomType: e.target.value
                  }
                })}
							>
								<option value="" defaultValue>Select</option>
								{
									roomTypes.map(type =>
										<option key={type.id} value={type.name}>
											{type.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Check In</Form.Label>
							<Form.Control
								type="text"
								placeholder="Checkin"
								value={reservation.checkIn}
								onChange={e => this.setState({
                  reservation: {
                    ...reservation,
                    checkIn: e.target.value
                  }
                })}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Check Out</Form.Label>
							<Form.Control
								type="text"
								placeholder="Checkout"
								value={reservation.checkOut}
								onChange={e => this.setState({
                  reservation: {
                    ...reservation,
                    checkOut: e.target.value
                  }
                })}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit reservation
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', reservation: { accommodation: '', roomType: '', checkIn: '', checkOut: ''}})}>New Reservation</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save reservation
							</Button>
						}
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Accommodation</th>
                <th>Room type</th>
                <th>Check in</th>
                <th>Check out</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								reservations.map(res => <tr key={res.id}>
									<td>{res.id}</td>
									<td>{res.accommodation}</td>
                  <td>{res.roomType}</td>
                  <td>{res.checkIn}</td>
                  <td>{res.checkOut}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(res.id)}>
											Edit
										</Button>
									</td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(res.id)}
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
export default AccommodationReservations;
