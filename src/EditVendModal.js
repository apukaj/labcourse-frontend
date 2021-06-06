import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditVendModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
      event.preventDefault();
      fetch(process.env.REACT_APP_API+'vendetturistike',{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            VendiId:event.target.VendiId.value,
                VendiName:event.target.VendiName.value,
              VendLokacioni:event.target.VendLokacioni.value
          })
      })
      .then(res=>res.json())
      .then((result)=>{
          alert(result);
      },
      (error)=>{
          alert('Failed');
      })
  }


  

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="VendiId">
                        <Form.Label>VendiId</Form.Label>
                        <Form.Control type="text" name="VendiId" required
                        disabled
                        defaultValue={this.props.empid} 
                        placeholder="VendiName"/>
                    </Form.Group>

                    <Form.Group controlId="VendiName">
                        <Form.Label>VendiName</Form.Label>
                        <Form.Control type="text" name="VendiName" required 
                        defaultValue={this.props.empname}
                        placeholder="VendiName"/>
                    </Form.Group>

                    
                    <Form.Group controlId="VendLokacioni">
                        <Form.Label>Lokacioni :</Form.Label>
                        <Form.Control type="text" name="VendLokacioni" required 
                        defaultValue={this.props.emploc}
                        placeholder="VendLokacioni"/>
                    </Form.Group>
                    
                       
                     

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Ndrysho
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Mbyll</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}