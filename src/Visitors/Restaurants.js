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

class VisitorsRestaurants extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  restaurants: [],
      chunkedRestaurants: []
		}
	}

	componentDidMount() {
		this.fetchRestaurants()
	}

  fetchRestaurants() {
    axios.get('https://localhost:5001/api/restaurants')
				 .then(response => {
					 this.setState({restaurants: response.data})
           this.setState({chunkedRestaurants: this.chunk(response.data, 3)})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  chunk (arr, len) {

    var chunks = [],
      i = 0,
      n = arr.length;
  
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
  
    return chunks;
  }

	render() {
		const { restaurants, chunkedRestaurants } = this.state

		return (
		<div className="visitors-container">
      <Container>
      <h1 className="places-header">Restaurants</h1>
      {
        chunkedRestaurants.map(chunk => {
          return (
            <CardGroup>
            {
              chunk.map(restaurant => {
                return (
                  <Card key={restaurant.id}>
                    <Card.Img variant="top" src={restaurant.image} style={{ aspectRatio: 16/9 }} />
                    <Card.Body>
                      <Card.Title>{restaurant.name}</Card.Title>
                      <Card.Text>
                        {restaurant.address} - {restaurant.city}
                      </Card.Text>
                      <Card.Link href={`/restaurant/${restaurant.id}`}>See details</Card.Link>
                    </Card.Body>
                  </Card>
                )
              })
            }
            </CardGroup>
          )
        })
      }
      </Container>
		</div>
		)
	}
}

export default VisitorsRestaurants;
