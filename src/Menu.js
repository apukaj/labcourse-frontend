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
			menu: '',
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
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

	handleEditSubmit(e) {
		e.preventDefault()
		const { menu, menus, editId } = this.state
		axios.put(`https://localhost:5001/api/menus/${editId}`, {
			id: editId,
			name: menu
		}).then(response => {
			const idx = menus.indexOf(menus.find(menu => menu.id === editId))
			this.state.menus[idx].name = menu
			this.setState({
				editId: '',
				menu: ''
			})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditClick(id) {
		const { menus } = this.state
		const editMenu = menus.find(menu => menu.id === id)
		this.setState({menu: editMenu.name, editId: id})
	}

	render() {
		const { menu, menus, editId } = this.state
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

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit menu
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', menu: ''})}>New Menu</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save menu
							</Button>
						}
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
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(menu.id)}>
											Edit
										</Button>
									</td>
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
