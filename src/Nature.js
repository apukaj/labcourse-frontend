import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Caves from './Caves'
import Parks from './Parks'

class Nature extends React.Component {
	render() {
		return (
		<div>
      <Parks />
      <hr />
      <Caves />
    </div>
		)
	}
}
export default Nature;
