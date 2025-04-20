import React, { useEffect, useState }  from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function Crud(){
    const[data,setData] = useState([]);
/** Add Field */
const [name,setStudentName] = useState('');
const [lastname,setStudentLastName] = useState('');
const [age,setStudentAge] = useState('');
const [grade,setStudentGrade] = useState('');
const[isactive,setStudentStatus] = useState(false);

/** Add Field */
useEffect(()=>{

},[])

const handleisactive=(e)=>{
    if(e.target.checked)
    {
        setStudentStatus(true);
    }
    else
    {
        setStudentStatus(false);
    }

}

const handlesave=()=>{
    const url = 'https://localhost:7227/api/Student';
    const savedata={
        "Name":name,
        "Age":age,
        "LastName":lastname,
        "Grade":grade,
        "IsActive":isactive
    }

    axios.post(url,savedata).then((result)=>{
      alert("Saved");
    });
}
    
    const handleEdit=()=>{
        handleShow()
    }
    /** Modal */
      const[show,setshow]=useState(false);
      const handleClose=()=>setshow(false);
      const handleShow=()=>setshow(true);
     /** Modal */
    return (
        <div className='container'>
          <div className='row'>
              <div className='col-6'>
                  <label>Name</label>
                  <input type='text' className='form-control Name' name='Name' onChange={(e)=>setStudentName(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Last Name</label>
                  <input type='text' className='form-control LastName' name='LastName' onChange={(e)=>setStudentLastName(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Age</label>
                  <input type='text' className='form-control Age' name='Age' onChange={(e)=>setStudentAge(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Grade</label>
                  <input type='text' className='form-control Grade' name='Grade' onChange={(e)=>setStudentGrade(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Is Active</label>
                  <input type='checkbox' className='isactive' name='isactive' onChange={handleisactive}/>
              </div>
              <div className='col-12'>
     
                  <button type='button' className='btn btn-primary' onClick={()=>handlesave()}>Save</button>
              </div>
          </div>
          {/**Table Code */}
          <div className='card'>
              <div className='card-header'>
                  <h3>Student List</h3>
              </div>
              <div className='card-body'>
                  <Table>
                      <thead>
                        <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Grade</th>
                      <th>Age</th>
                      <th>Status</th>
                      <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>1</td>
                        <td>Raja</td>
                        <td>Chohan</td>
                        <td>8</td>
                        <td>31</td>
                        <td><button type='button' className='btn btn-primary px-2' onClick={()=>handleEdit()}>Edit</button><button type='button' className='btn btn-danger'>Delete</button></td>
                        </tr>
                      </tbody>
                  </Table>
              </div>
          </div>
          <div className="Card">
                 {/**EDIT MODAL show={show} onHide={handleClose}*/}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Student</Modal.Title>
                    </Modal.Header>
            <Modal.Body>
            <div className='row'>
              <div className='col-6'>
                  <label>Name</label>
                  <input type='text' className='form-control EditName' name='EditName'></input>
              </div>
              <div className='col-6'>
                  <label>Last Name</label>
                  <input type='text' className='form-control EditLastName' name='EditLastName'></input>
              </div>
              <div className='col-6'>
                  <label>Age</label>
                  <input type='text' className='form-control EditAge' name='EditAge'></input>
              </div>
              <div className='col-6'>
                  <label>Grade</label>
                  <input type='text' className='form-control EditGrade' name='EditGrade'></input>
              </div>
              <div className='col-6'>
                  <label>Is Active</label>
                  <input type='checkbox' className='Editisactive' name='Editisactive'/>
              </div>
          </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant ="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* onClick={()=>handleUpdate()} */}
                <Button variant ="primary" > 
                    Update
                </Button>
            </Modal.Footer>
            </Modal>
            </div>
      </div>
    )
}