import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Sidebar from './Sidebar'
import { Button } from 'react-bootstrap';


function Login() {
  const [data, setData] = useState({
    uid: '',
    name: ''


  })

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("uid", data.uid);
    formdata.append("name", data.name);
    


    console.log("object", formdata);
    console.log("data", data);


    axios.post('http://localhost:5000/api/admin/adduser', data, formdata)
      .then(res => {
        navigate("/user")
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      <Sidebar />
      <div style={{
        width: "1125px",
        height: '90vh',
        marginLeft: '233px',
        marginTop: "-750px",

        backgroundColor: "#fff",
      }}>
        
        
          <div className='d-flex flex-column align-items-center ' style={{marginTop:'50px'}} >
            <h5>LOGIN</h5>
            <form class="row col-" style={{ border: "1px solid black" }} onSubmit={handleSubmit}>

              <div class="col-6">
                <label htmlFor="formGroupExampleInput" className="form-label">User_ID</label>
                <input type="text" className="form-control" id="formGroupExampleInput" name="role_id" onChange={e => setData({ ...data, uid: e.target.value })} />
              </div>
              <div class="col-6">
                <label htmlFor="formGroupExampleInput2" className="form-label"> Name: </label>
                <input type="text" className="form-control" id="formGroupExampleInput2" name="role_name" onChange={e => setData({ ...data, Name: e.target.value })} />
              </div>
           
           
              <div>
                <Button className="btn-success" onClick={handleSubmit}  style={{marginLeft:'120px'}}> SAVE</Button></div>
            </form>
          </div>


        </div>

      

    </>

  )
}

export default Login