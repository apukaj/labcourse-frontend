import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      tosAgree: false
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    
    const { email, username, password, confirmPassword, tosAgree } = this.state

    if (!email) {
      alert("Please provide an email address!")
      return
    }

    if (!username) {
      alert("Please provide a username!")
      return
    }

    if (!password || password !== confirmPassword) {
      alert("The passwords do not match!")
      return
    }

    if (!tosAgree) {
      alert("You have to read and agree the tos to continue!")
      return
    }

    alert("We are registering you now. Thank you!!!")

    axios.post('https://localhost:5001/api/identity/register', {
      email,
      username,
      password
    }).then(response => {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("email", email)
      window.location = "/admin/cities"
      console.log(response.data)
    }).catch(error => {
      console.log(error.response.data.errors)
    })
  }
    
  render() {
    return (
    <Container style={{ width: '50%' }}>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <h1>Create new account</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email" style={{ marginBottom: 15 }}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => this.setState({email: e.target.value})} 
              />
            </Form.Group>

            <Form.Group controlId="username" style={{ marginBottom: 15 }}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username" 
                onChange={e => this.setState({username: e.target.value})}  
              />
            </Form.Group>

            <Form.Group controlId="password" style={{ marginBottom: 15 }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password" 
                onChange={e => this.setState({password: e.target.value})}  
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" style={{ marginBottom: 15 }}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={e => this.setState({confirmPassword: e.target.value})}  
              />
            </Form.Group>
            <Form.Group controlId="tosAgree" style={{ marginBottom: 15 }}>
              <Form.Check
                type="checkbox"
                label="I agree with the ToS"
                onChange={e => this.setState({tosAgree: e.target.checked})}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    )
  }
}
export default Register;
