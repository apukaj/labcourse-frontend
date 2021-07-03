import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { Container, NavLink } from 'react-bootstrap';

class VisitorsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  list: []
		}
	}

	componentDidMount() {
		Storage.prototype.getObj = function(key) {
      return JSON.parse(this.getItem(key))
    }
    this.setState({list: localStorage.getObj('kosovotrip-list') || []})
	}

	render() {
		const { list } = this.state

		return (
		<div className="visitors-container">
      <Container style={{ textAlign: 'left'}}>
      <h1 className="places-header">Places to visit</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Type</td>
            <td>Name</td>
            <td>City</td>
            <td>Address</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
        {
          list.map(item => {
            return <tr>
              <td>{item.type}</td>
              <td>{item.name}</td>
              <td>{item.city}</td>
              <td>{item.address}</td>
              <td>
              <Button
                  variant="danger"
                  onClick={() => {
                    Storage.prototype.setObj = function(key, obj) {
                      return this.setItem(key, JSON.stringify(obj))
                    }
                    Storage.prototype.getObj = function(key) {
                        return JSON.parse(this.getItem(key))
                    }
                    let list = localStorage.getObj('kosovotrip-list') || []
                    let newList = list.filter(x => !(x.type === item.type && x.name === item.name))
                    localStorage.setObj('kosovotrip-list', newList)
                    this.setState({list: newList})
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          })
        }
        </tbody>
      </Table>
      </Container>
		</div>
		)
	}
}

export default VisitorsList;
