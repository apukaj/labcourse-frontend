import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class RestaurantReservations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  reservations: [],
			reservation: {
        restaurant: '',
        guestCount: '',
        reservationTime: ''
      },
      restaurants: [],
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
    this.fetchReservations()
    this.fetchRestaurants()
	}

  fetchReservations() {
    axios.get('https://localhost:5001/api/restaurantreservations')
				 .then(response => {
					 this.setState({reservations: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchRestaurants() {
    axios.get('https://localhost:5001/api/restaurants')
				 .then(response => {
					 this.setState({restaurants: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

	handleSubmit(e) {
		e.preventDefault()
		const { reservations } = this.state
    const { restaurant, guestCount, reservationTime } = this.state.reservation
		// if (!type) {
		// 	alert("Please provide a type name!")
		// 	return
		// }

		axios.post('https://localhost:5001/api/restaurantreservations', {
			restaurant,
      guestCount,
      reservationTime
		}).then(response => {
			this.setState({reservations: [...reservations, response.data]})
			this.setState({reservation: {
        restaurant: '',
        guestCount: '',
        reservationTime: ''
      }})
		}).catch(error => {
			console.log(error)
		})
	}

	handleDelete(id) {
		const { reservations } = this.state
		axios.delete(`https://localhost:5001/api/restaurantreservations/${id}`).then(response => {
			this.setState({reservations: reservations.filter(reservation => reservation.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { reservation, reservations, editId } = this.state
		axios.put(`https://localhost:5001/api/restaurantreservations/${editId}`, {
			id: editId,
			restaurant: reservation.restaurant,
			guestCount: reservation.guestCount,
			reservationTime: reservation.reservationTime,
			checkOut: reservation.checkOut
		}).then(response => {
			const idx = reservations.indexOf(reservations.find(reservation => reservation.id === editId))
			this.state.reservations[idx].restaurant = reservation.restaurant
			this.state.reservations[idx].guestCount = reservation.guestCount
			this.state.reservations[idx].reservationTime = reservation.reservationTime
			this.setState({
				editId: '',
				reservation: {
					restaurant: '',
          guestCount: '',
          reservationTime: ''
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
				restaurant: editReservation.restaurant,
				guestCount: editReservation.guestCount,
				reservationTime: editReservation.reservationTime
			}, 
			editId: id
		})
	}

	render() {
		const { reservation, reservations, editId } = this.state
		const { restaurants } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add reservation</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Restaurant</Form.Label>
							<Form.Control
								as="select"
								placeholder="Type"
								value={reservation.restaurant}
								onChange={e => this.setState({
                  reservation: {
                    ...reservation,
                    restaurant: e.target.value
                  }
                })}
							>
								<option value="" defaultValue>Select</option>
								{
									restaurants.map(rest =>
										<option key={rest.id} value={rest.name}>
											{rest.name}
										</option>
									)
								}
							</Form.Control>
						</Form.Group>

            <Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Nr. of Guests</Form.Label>
							<Form.Control
								type="number"
								placeholder="Guests"
								value={reservation.guestCount}
								onChange={e => this.setState({
                  reservation: {
                    ...reservation,
                    guestCount: Number(e.target.value)
                  }
                })}
							/>
						</Form.Group>

						<Form.Group controlId="name" style={{ marginBottom: 15 }}>
							<Form.Label>Date & Time</Form.Label>
							<Form.Control
								type="text"
								placeholder="Date & time"
								value={reservation.reservationTime}
								onChange={e => this.setState({
                  reservation: {
                    ...reservation,
                    reservationTime: e.target.value
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
								<th>Restaurant</th>
                <th>Guest count</th>
                <th>Time</th>
                <th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								reservations.map(res => <tr key={res.id}>
									<td>{res.id}</td>
									<td>{res.restaurant}</td>
                  <td>{res.guestCount}</td>
                  <td>{res.reservationTime}</td>
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
export default RestaurantReservations;
