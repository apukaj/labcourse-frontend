import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { Container } from 'react-bootstrap';

class VisitorsCave extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  cave: ''
		}
	}

	componentDidMount() {
		this.fetchCave(this.props.match.params.id)
	}

  fetchCave(id) {
    axios.get(`https://localhost:5001/api/caves/${id}`)
				 .then(response => {
					 this.setState({cave: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
  }

	render() {
		const { cave } = this.state
		return (
		<div className="visitors-container">
      <Container>
      <Row>
        <Col>
          <h3>{cave.name}</h3>
          <p>{cave.address} - {cave.city}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <img width={800} src={cave.image} />
        </Col>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam risus ipsum, viverra id ante et, eleifend iaculis dolor. Sed tempus dapibus nunc et dignissim. Donec suscipit pellentesque sem, eget consequat turpis bibendum at. Aenean ut pharetra risus. Integer ultrices neque eu diam elementum fermentum. Morbi convallis aliquam nibh vulputate tincidunt. Fusce sollicitudin iaculis sem, et dapibus enim porta vitae. Vivamus sed felis vel risus mattis laoreet.</p>
        <p>Aliquam a risus sagittis nibh commodo tempor vel ac justo. Nulla euismod massa id sem imperdiet consectetur. Ut tempor mi vel tellus hendrerit, id mollis elit maximus. Nulla malesuada aliquam augue, vitae aliquet ipsum ornare eu. Quisque imperdiet consequat est vehicula condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras facilisis purus id quam sodales sagittis et non arcu. Aenean rutrum malesuada libero, molestie faucibus enim interdum non. Suspendisse aliquam orci sit amet ante iaculis, sed eleifend erat imperdiet. Cras quis porta dui.</p>
      </Row>
			<Row>
				<Col>
					<Button onClick={() => {
						Storage.prototype.setObj = function(key, obj) {
							return this.setItem(key, JSON.stringify(obj))
						}
						Storage.prototype.getObj = function(key) {
								return JSON.parse(this.getItem(key))
						}
						let list = localStorage.getObj('kosovotrip-list') || []
						let found = list.find(x => x.type === 'cave' && x.name === cave.name)
						if (!found) {
							list.push({type: 'Cave', name: cave.name, city: cave.city, address: cave.address})
						}
						localStorage.setObj('kosovotrip-list', list)
						alert('Thank for adding us to your list!')
					}}>Add to my list</Button>
				</Col>
			</Row>
      </Container>
		</div>
		)
	}
}

export default VisitorsCave;
