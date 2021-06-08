import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

class Menus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  menus: [],
			menu: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/menus')
				 .then(response => {
					 this.setState({menus: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { menu, menus } = this.state

		if (!menu) {
			alert("Please choose the menu!")
			return
		}

		axios.post('https://localhost:5001/api/menus', {
			name: menu
		}).then(response => {
			this.setState({menus: [...menus, response.data]})
			this.setState({menu: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { menus } = this.state
		axios.delete(`https://localhost:5001/api/menus/${id}`).then(response => {
			this.setState({menus: menus.filter(menu => menu.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	render() {
		const { menu, menus } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add Menu</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="formBasicEmail" style={{ marginBottom: 15 }}>
							<Form.Label>Menu name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Menu name"
								value={menu}
								onChange={e => this.setState({menu: e.target.value})}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Save menu
						</Button>
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Menu</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								menus.map(menu => <tr key={menu.id}>
									<td>{menu.id}</td>
									<td>{menu.name}</td>
									<td><Button variant="warning">Edit</Button></td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(menu.id)}
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
export default Menus;
