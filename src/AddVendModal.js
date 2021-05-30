import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddVendModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        /* this.handleFileSelected=this.handleFileSelected.bind(this);/*/
    }



    componentDidMount(){
        fetch(process.env.REACT_APP_API+'VendetTuristike')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'VendetTuristike',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                /* EmployeeId:null, */
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
            Add Vend
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="VendiName">
                        <Form.Label>Emri Vendit :</Form.Label>
                        <Form.Control type="text" name="VendiName" required 
                        placeholder="EmriVendit"/>
                    </Form.Group>

                    <Form.Group controlId="VendLokacioni">
                        <Form.Label>Lokacioni :</Form.Label>
                        <Form.Control type="text" name="VendLokacioni" required 
                        placeholder="VendLokacioni"/>
                    </Form.Group>

                   

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Shto Vendin
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

           
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}
export default AddVendModal;