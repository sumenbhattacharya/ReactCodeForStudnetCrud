import React, { useEffect, useState }  from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import Swal from 'sweetalert2';
import {FaTrashAlt ,FaPencilAlt }  from 'react-icons/fa';

export function Crud(){
    const[data,setData] = useState([]);
/** Add Field */
const [name,setStudentName] = useState('');
const [lastname,setStudentLastName] = useState('');
const [age,setStudentAge] = useState('');
const [grade,setStudentGrade] = useState('');
const[isactive,setStudentStatus] = useState(false);

/** Add Field */

/**Edit Field */
const [editid,setStudentEditId] = useState('');
const [editname,setStudentEditName] = useState('');
const [editlastname,setStudentEditLastName] = useState('');
const [editage,setStudentEditAge] = useState('');
const [editgrade,setStudentEditGrade] = useState('');
const[editisactive,setStudentEditStatus] = useState(false);
/**Edit Field */
useEffect(()=>{
getData();
},[])

const getData=()=>{
    axios.get("https://localhost:7227/api/Student").then((result)=>{
        console.log("GetData"+JSON.stringify(result.data));
        setData(result.data);
    })
    .catch((error)=>{
        console.log(error);
    })

    
}

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

const handleiseditactive=(e)=>{
    if(e.target.checked)
    {
        setStudentEditStatus(true);
    }
    else
    {
        setStudentEditStatus(false);
    }

}

const handlesave=()=>{
    const url = 'https://localhost:7227/api/Student';
    const savedata={
        "name":name,
        "age":age,
        "lastName":lastname,
        "grade":grade,
        "isActive":isactive

    }

    axios.post(url,savedata).then((result)=>{
        getData();
        clear();
      Swal.fire({
        title: "Success",
        text: "Save Successfully",
        icon: "success",
        confirmButtonText: "Ok"
      });
      
    });
}
    
    const handleedit=(id)=>{
        handleShow();
        setStudentEditId('');
        setStudentEditName('');
        setStudentEditLastName('');
        setStudentEditAge('');
        setStudentEditGrade('');
        setStudentEditStatus(false);

        const editurl = 'https://localhost:7227/api/Student/'+id;
        axios.get(editurl).then((result)=>{

            setStudentEditId(result.data.id);
            setStudentEditName(result.data.name);
            setStudentEditLastName(result.data.lastname);
            setStudentEditAge(result.data.age);
            setStudentEditGrade(result.data.grade);
            setStudentEditStatus(result.data.isActive);

        }).catch((error)=>{
            console.log(error);
        })

    }

    const HandleEditsave=()=>{
        const updateurl = `https://localhost:7227/api/Student/${editid}`;

        const editsavedata={
            "id": editid,
            "name": editname,
            "age": editage,
            "lastName": editlastname,
            "grade": editgrade,
            "isActive": editisactive
        }

        axios.put(updateurl,editsavedata).then((result)=>{
            getData();
            clear();
            Swal.fire({
                title: "Update",
                text: "Update Successfully",
                icon: "success",
                confirmButtonText: "Ok"
              });
            handleClose();
        })
    }
    /**Delete */
    const handledelete=(id)=>{
        Swal.fire({
            title: "Are you Sure?",
            text: "Once it deleted you won't be able to revert!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonText:"Cancel",
            confirmButtonText: "Yes Delete It"
          }).then((result)=>{
            if(result.isConfirmed)
            {
                const deleteurl = `https://localhost:7227/api/Student/${id}`;
                axios.delete(deleteurl).then((result)=>{
                    getData();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Delete Successfully",
                        icon: "success"           
                      });
                })
            }
          });
    }
   /**Delete */

   /**Clear State */
const clear=()=>{

    /**Add Clear */
    setStudentName('');
    setStudentLastName('');
    setStudentAge('');
    setStudentGrade('');
    setStudentStatus(false);
    /**Add Clear */

    /**Edit Clear */
    setStudentEditId('');
    setStudentEditName('');
    setStudentEditLastName('');
    setStudentEditAge('');
    setStudentEditGrade('');
    setStudentEditStatus(false);
        /**Edit Clear */
}
   /**Clear State */
    /** Modal */
      const[show,setshow]=useState(false);
      const handleClose=()=>setshow(false);
      const handleShow=()=>setshow(true);
     /** Modal */
    return (
        <div className='container'>
          <div className='row marginbothside'>
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
                  <label className="width100">Is Active</label>
                  <input type='checkbox' className='isactive' name='isactive' onChange={handleisactive}/>
              </div>
              <div className='col-12 text-align-left gy-2 py-2'>     
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
                        {
                            data && data.length>0?
                            data.map((item,index)=>{
                           return (     <tr key = {index}>
                                   <td>{item.id}</td>
                                   <td>{item.name}</td>
                                   <td>{item.lastName}</td>
                                   <td>{item.grade}</td>
                                   <td>{item.age}</td>
                                   <td>{item.isActive==true? <Badge bg="primary">Active</Badge>:<Badge bg="danger">In Active</Badge>}</td>
                                   <td><button type='button' className='btn btn-primary px-2' onClick={()=>handleedit(item.id)}><FaPencilAlt className="primary"/></button><button type='button' className='btn btn-danger' onClick={()=>handledelete(item.id)}><FaTrashAlt className="danger"/></button></td>
                                 </tr>
                                 )
                            })
                            :
                          <tr className="text-center row"><td colSpan={4}>No Data</td></tr>
                        }

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
                  <label>ID</label>
                  <input type='text' disabled className='form-control EditId' name='EditId' value={editid} onChange={(e)=>setStudentEditId(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Name</label>
                  <input type='text' className='form-control EditName' name='EditName' value={editname} onChange={(e)=>setStudentEditName(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Last Name</label>
                  <input type='text' className='form-control EditLastName' name='EditLastName' value={editlastname} onChange={(e)=>setStudentEditLastName(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Age</label>
                  <input type='text' className='form-control EditAge' name='EditAge'value={editage} onChange={(e)=>setStudentEditAge(e.target.value)}></input>
              </div>
              <div className='col-6'>
                  <label>Grade</label>
                  <input type='text' className='form-control EditGrade' name='EditGrade' value={editgrade} onChange={(e)=>setStudentEditGrade(e.target.value)}></input>
              </div>
              <div className='col-6 aligncenter text-center'>
                  <label className="width100" >Is Active</label>

                  <input type='checkbox' className='Editisactive' name='Editisactive' value={editisactive}
                  checked={editisactive==true?true:false}
                  onChange={handleiseditactive}
                  />
              </div>
          </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant ="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* onClick={()=>handleUpdate()} */}
        
                <Button variant ="primary" onClick={()=>HandleEditsave()}> 
                    Update
                </Button>
            </Modal.Footer>
            </Modal>
            </div>
      </div>
    )
}