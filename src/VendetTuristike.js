import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddVendModal} from './AddVendModal';
import {EditVendModal} from './EditVendModal';


export class VendetTuristike extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'VendetTuristike')
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

    deleteEmp(VendiId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'VendetTuristike/'+VendiId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, empid, empname, emploc}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Vendi :</th>
                        <th>Lokacioni :</th>
                     
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.VendiId}>
                                <td>{emp.VendiName}</td>
                                <td>{emp.VendLokacioni}</td>
                               <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
      empid:emp.VendiId,empname:emp.VendiName,emploc:emp.VendLokacioni})}>
            Ndrysho
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.VendiId)}>
            Fshije
        </Button>


<EditVendModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        emploc={emploc}
        />
        
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Shto nje vend</Button>


                    <AddVendModal show={this.state.addModalShow}
                    onHide={addModalClose}/>

                    
                </ButtonToolbar>
            </div>
        )
    }
}
export default VendetTuristike;