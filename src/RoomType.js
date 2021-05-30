import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios'

/*
import {AddVendModal} from './AddVendModal';
import {EditVendModal} from './EditVendModal';
*/

export class RoomType extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Room')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(RoomId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Room /'+RoomId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, empid,empname,empsts,empdtj,empdte,empprc}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>RoomName :</th>
                            <th>Status Of Room :</th>
                            <th>DateOfJoining :</th>
                            <th>DateOfExit :</th>
                            <th>Price :</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.RoomId}>
                                <td>{emp.RoomName}</td>
                                <td>{emp.StatusOfRoom}</td>
                                <td>{emp.DateOfJoining}</td>
                                <td>{emp.DateOfExit}</td>
                                <td>{emp.Price}</td>
                               <td>
                                 
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
      RoomId:emp.RoomId,empname:emp.RoomName,empsts:emp.SatusOfRoom,empdtj:emp.DateOfJoining,
      empdte:emp.DateOfExit,empprc:emp.Price})}>
            Ndrysho
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.RoomId)}>
            Fshije
        </Button>

{/*
<EditVendModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        emploc={emploc}
        />
*/}
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Shto nje vend</Button>

{/*
                    <AddVendModal show={this.state.addModalShow}
                    onHide={addModalClose}/>

*/}
                </ButtonToolbar>
            </div>
        )
    }
}
export default RoomType;
