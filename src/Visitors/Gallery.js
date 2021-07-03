import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import axios from 'axios'
import { Container } from 'react-bootstrap';

class VisitorsGallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  images: []
		}
	}

	componentDidMount() {
		this.fetchImages()
	}

  fetchImages() {
    axios.get('https://localhost:5001/api/images')
				 .then(response => {
					 this.setState({images: this.chunk(response.data, 3)})
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
		const { images } = this.state
		return (
		<div className="visitors-container">
      <Container>
      {
        images.map(chunk => {
          return <CardGroup>
            {
              chunk.map(image => {
                return (
                  <Card key={image.id}>
                    <Card.Img variant="top" src={image.source} style={{ aspectRatio: 16/9 }} />
                    <Card.Body>
                      <Card.Text>
                        {image.caption}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })
            }
            </CardGroup>
        })
      }
      </Container>
		</div>
		)
	}
}

export default VisitorsGallery;
