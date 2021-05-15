import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  email: '',
		  password: ''
		};
	
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleSubmit(e) {
		e.preventDefault()
		
		const { email, password } = this.state

		if (!email) {
			alert("Please provide an email address!")
			return
		}

		if (!password) {
			alert("Please type your password!")
			return
		}

		alert("We are logging you in now. Thank you!!!")

		axios.post('https://localhost:44333/api/identity/login', {
			email,
			password
		}).then(response => {
			localStorage.setItem("token", response.data.token)
			localStorage.setItem("email", email)
			this.props.history.push("home")
			console.log(response.data)
		}).catch(error => {
			alert("We couldn't log you in with the provided credentials!")
			console.log(error.response.data.errors)
		})
	}
	
	render() {
		return (
		<Container style={{ width: '50%' }}>
			<Card style={{ marginTop: 100 }}>
				<Card.Body>
					<h1>Login</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="formBasicEmail" style={{ marginBottom: 15 }}>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								onChange={e => this.setState({email: e.target.value})}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPassword" style={{ marginBottom: 15 }}>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={e => this.setState({password: e.target.value})}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox" style={{ marginBottom: 15 }}>
							<Form.Check type="checkbox" label="Remember me" />
						</Form.Group>
						<Button variant="primary" type="submit">
							Login
						</Button>
						</Form>
				</Card.Body>
			</Card>
		</Container>
		)
	}
}
export default Login;
