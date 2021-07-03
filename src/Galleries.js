import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'


class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  gallerys: [],
			gallery: {
        caption: '',
        source: ''
      },
			editId: ''
		}
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEditSubmit = this.handleEditSubmit.bind(this)
		this.handleEditClick = this.handleEditClick.bind(this)
	}

	componentDidMount() {
		axios.get('https://localhost:5001/api/images')
				 .then(response => {
					 this.setState({gallerys: response.data})
					 console.log(response)
				 }).catch(error => {
					 console.log(error.response.data)
				 })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { gallery, gallerys } = this.state
    const { source, caption } = gallery
		if (!gallery) {
			alert("Please upload a photo!")
			return
		}

		axios.post('https://localhost:5001/api/images', {
			source,
      caption
		}).then(response => {
			this.setState({gallerys: [...gallerys, response.data]})
			this.setState({gallery: ''})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleDelete(id) {
		const { gallerys } = this.state
		axios.delete(`https://localhost:5001/api/images/${id}`).then(response => {
			this.setState({gallerys: gallerys.filter(gallery => gallery.id !== id)})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditSubmit(e) {
		e.preventDefault()
		const { gallery, gallerys, editId } = this.state
		axios.put(`https://localhost:5001/api/images/${editId}`, {
			id: editId,
			caption: gallery.caption,
      source: gallery.source
		}).then(response => {
			const idx = gallerys.indexOf(gallerys.find(gallery => gallery.id === editId))
			this.state.gallerys[idx].caption = gallery.caption
      this.state.gallerys[idx].source = gallery.source
			this.setState({
				editId: '',
				gallery: {
          source: '',
          caption: ''
        }
			})
		}).catch(error => {
			console.log(error.response.data)
		})
	}

	handleEditClick(id) {
		const { gallerys } = this.state
		const editGallery = gallerys.find(gallery => gallery.id === id)
		this.setState({gallery: editGallery, editId: id})
	}

	render() {
		const { gallery, gallerys, editId } = this.state
		return (
		<div>
			<Row>
				<Col>
					<h1>Add Image</h1>
					<Form>
						<Form.Group controlId="formBasicEmail" style={{ marginBottom: 15 }}>
							<Form.Control
								type="file"
								placeholder="img.jpg"
								onChange={e => {
                  let file = e.target.files[0]
                  const toBase64 = file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                  });

                  toBase64(file).then((r) => this.setState({gallery: {...gallery, source: r}}))
                }}
							/>
						</Form.Group>

              <Form.Group controlId="formBasicEmail" style={{ marginBottom: 15 }}>
							<Form.Label>Caption</Form.Label>
							<Form.Control
								type="text"
								placeholder="Add Caption"
								value={gallery.caption}
								onChange={e => this.setState({gallery: {...gallery, caption: e.target.value}})}
							/>
						</Form.Group>

						{
							editId ?
							<div>
								<Button style={{ marginRight: 5 }} variant="primary" type="submit" onClick={this.handleEditSubmit}>
									Edit
								</Button>
								<Button variant="primary" onClick={() => this.setState({editId: '', city: ''})}>New City</Button>
							</div> :
							<Button variant="primary" type="submit" onClick={this.handleSubmit}>
								Save
							</Button>
						}
					</Form>
				</Col>
				<Col>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Image</th>
                <th>Caption</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								gallerys.map(gallery => <tr key={gallery.id}>
									<td>{gallery.id}</td>
									<td>
                    <img height={100} src={gallery.source} />
                  </td>
                  <td>{gallery.caption}</td>
									<td>
										<Button
											variant="warning"
											onClick={() => this.handleEditClick(gallery.id)}>
											Edit
										</Button></td>
									<td>
										<Button
											variant="danger"
											onClick={() => this.handleDelete(gallery.id)}
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
export default Gallery;
