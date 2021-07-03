import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import axios from 'axios'
import { Container, NavLink } from 'react-bootstrap';

class VisitorsNature extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  parks: [],
		  monuments: [],
      caves: [],
      shoppings: [],
      chunkedParks: [],
      chunkedMonuments: [],
      chunkedCaves: [],
      chunkedShoppings: []
		}
	}

	componentDidMount() {
		this.fetchParks()
    this.fetchMonuments()
    this.fetchCaves()
    this.fetchShoppings()
	}

  fetchParks() {
    axios.get('https://localhost:5001/api/parks')
				 .then(response => {
					 this.setState({parks: response.data})
           this.setState({chunkedParks: this.chunk(response.data, 3)})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchMonuments() {
    axios.get('https://localhost:5001/api/monuments')
    .then(response => {
      this.setState({monuments: response.data})
      this.setState({chunkedMonuments: this.chunk(response.data, 3)})
      console.log(response)
    }).catch(error => {
      console.log(error.response.data)
    })
  }

  fetchCaves() {
    axios.get('https://localhost:5001/api/caves')
				 .then(response => {
					 this.setState({caves: response.data})
           this.setState({chunkedCaves: this.chunk(response.data, 3)})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

  fetchShoppings() {
    axios.get('https://localhost:5001/api/shoppings')
				 .then(response => {
					 this.setState({shoppings: response.data})
           this.setState({chunkedShoppings: this.chunk(response.data, 3)})
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
		const { chunkedCaves, chunkedParks, chunkedShoppings, chunkedMonuments } = this.state
		return (
		<div className="visitors-container">
      <Container>
      <h1 className="places-header">Parks</h1>
      {
        chunkedParks.map(chunk => {
          return (
            <CardGroup>
            {
              chunk.map(park => {
                return (
                  <Card key={park.id}>
                    <Card.Img variant="top" src={park.image} style={{ aspectRatio: 16/9 }} />
                    <Card.Body>
                      <Card.Title>{park.name}</Card.Title>
                      <Card.Text>
                        {park.address} - {park.city}
                      </Card.Text>
                      <Card.Link href={`/park/${park.id}`}>See details</Card.Link>
                    </Card.Body>
                  </Card>
                )
              })
            }
            </CardGroup>
          )
        })
      }
      <h1 className="places-header">Caves</h1>
      {
        chunkedCaves.map(chunk => {
          return (
            <CardGroup>
            {
              chunk.map(cave => {
                return (
                  <Card key={cave.id}>
                    <Card.Img variant="top" src={cave.image} style={{ aspectRatio: 16/9 }} />
                    <Card.Body>
                      <Card.Title>{cave.name}</Card.Title>
                      <Card.Text>
                        {cave.address} - {cave.city}
                      </Card.Text>
                      <Card.Link href={`/cave/${cave.id}`}>See details</Card.Link>
                    </Card.Body>
                  </Card>
                )
              })
            }
            </CardGroup>
          )
        })
      }
      <h1 className="places-header">Shopping</h1>
      {
        chunkedShoppings.map(chunk => {
          return (
            <CardGroup>
            {
              chunk.map(shopping => {
                return (
                  <Card key={shopping.id}>
                    <Card.Img variant="top" src={shopping.image} style={{ aspectRatio: 16/9 }} />
                    <Card.Body>
                      <Card.Title>{shopping.name}</Card.Title>
                      <Card.Text>
                        {shopping.address} - {shopping.city}
                      </Card.Text>
                      <Card.Link href={`/shopping/${shopping.id}`}>See details</Card.Link>
                    </Card.Body>
                  </Card>
                )
              })
            }
            </CardGroup>
          )
        })
      }
      <h1 className="places-header">Monuments</h1>
      {
        chunkedMonuments.map(chunk => {
          return (
            <CardGroup>
            {
              chunk.map(monument => {
                return (
                  <Card key={monument.id}>
                    <Card.Img variant="top" src={monument.image} style={{ aspectRatio: 16/9 }} />
                    <Card.Body>
                      <Card.Title>{monument.name}</Card.Title>
                      <Card.Text>
                        {monument.address} - {monument.city}
                      </Card.Text>
                      <Card.Link href={`/monument/${monument.id}`}>See details</Card.Link>
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

export default VisitorsNature;
