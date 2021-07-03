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

class VisitorsHotels extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  hotels: [],
      chunkedHotels: []
		}
	}

	componentDidMount() {
		this.fetchHotels()
	}

  fetchHotels() {
    axios.get('https://localhost:5001/api/accommodations')
				 .then(response => {
					 this.setState({hotels: response.data})
           this.setState({chunkedHotels: this.chunk(response.data, 3)})
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
		const { hotels, chunkedHotels } = this.state

		return (
		<div className="visitors-container">
      <Container>
      <h1 className="places-header">Hotels</h1>
      {
        chunkedHotels.map(chunk => {
          return (
            <CardGroup>
            {
              chunk.map(hotel => {
                return (
                  <Card key={hotel.id}>
                    <Card.Img variant="top" src={hotel.image} style={{ aspectRatio: 16/9 }} />
                    <Card.Body>
                      <Card.Title>{hotel.name}</Card.Title>
                      <Card.Text>
                        {hotel.address} - {hotel.city}
                      </Card.Text>
                      <Card.Link href={`/hotel/${hotel.id}`}>See details</Card.Link>
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

export default VisitorsHotels;
