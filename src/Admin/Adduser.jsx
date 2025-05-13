import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Sidebar from './Sidebar'
import { Button, Table, Col, Row, Form, Dropdown, Modal, Pagination } from 'react-bootstrap';


function AddEmployee() {
	const [data, setData] = useState({
		uid: '',
		name: '',
		email: '',
		password: '',
		mobile: '',
		photo: '',
		aadhaar: '',
		doj: '',
		qualification: '',
		dob: '',
		address: '',
		state: '',
		city: '',
		pin: '',
		status: '',
		country: ''
		

	})

	const navigate = useNavigate()
	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("uid", data.uid);
		formdata.append("name", data.name);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("mobile", data.mobile);
		formdata.append("photo", data.photo);
		formdata.append("aadhaar", data.aadhaar);
		formdata.append("doj", data.doj);
		formdata.append("qualification", data.qualification);
		formdata.append("dob", data.dob);
		formdata.append("address", data.address);
		formdata.append("state", data.state);
		formdata.append("city", data.city);
		formdata.append("pin", data.pin);
		formdata.append("status", data.status);
		formdata.append("country", data.country);
		

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
                width: "1268px",
                height: '69vh',
                marginLeft: '255px',
               
                marginTop: "-660px",

                backgroundColor: "#fff",
            }}>

				<div style={{  border: '2px solid black',marginTop: "8px"}}>
				{/* <div> */}
				<div  className='d-flex flex-column align-items-center ' >
			<h5>Add Users</h5>
			<Form onSubmit={handleSubmit}>
			<Row>		
			<Col>
								<label htmlFor="formGroupExampleInput" className="form-label">User_ID:</label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data, uid: e.target.value })} />
							</Col>
							<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label"> Name: </label>
								<input type="text" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({ ...data, Name: e.target.value })} />
								</Col>
							<Col>
								<label htmlFor="formGroupExampleInput" className="form-label">Email:</label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data, Email: e.target.value })} />
							</Col>
							<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label"> Password: </label>
								<input type="text" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({ ...data, Password: e.target.value })} />
								</Col>
								</Row>	
								<Row>	
							<Col>
								<label htmlFor="formGroupExampleInput" className="form-label">Mobile:</label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data, Mobile: e.target.value })} />
								</Col>
								<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label">  Photo  </label>
								<input type="file" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({...data, photo: e.target.files[0]})} />
								</Col>
								<Col>
								<label htmlFor="formGroupExampleInput" className="form-label">Aadhaar:</label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data, aadhaar: e.target.value })} />
								</Col>
							<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label"> DOJ  </label>
								<input type="date" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({ ...data, doj : e.target.value })} />
								</Col>
								</Row>
								<Row>				
								<Col>
								<label htmlFor="formGroupExampleInput" className="form-label">Qualification</label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data, qualification: e.target.value })} />
								</Col>
								<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label">DOB   </label>
								<input type="date" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({ ...data, dob : e.target.value })} />
								</Col>
								<Col>
								<label htmlFor="formGroupExampleInput" className="form-label">Address :</label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data, address : e.target.value })} />
								</Col>
								<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label"> State  </label>
								<input type="state" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({ ...data, state: e.target.value })} />
								</Col>
								</Row>
								<Row>				
								<Col>
								<label htmlFor="formGroupExampleInput" className="form-label"> City </label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data,  city: e.target.value })} />
								</Col>
								<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label">  Pin  </label>
								<input type="number" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({ ...data, pin: e.target.value })} />
								</Col>
							<Col>
								<label htmlFor="formGroupExampleInput" className="form-label"> Status </label>
								<input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={e => setData({ ...data, status: e.target.value })} />
								</Col>
								<Col>
								<label htmlFor="formGroupExampleInput2" className="form-label"> Country  </label>
								<input type="text" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={e => setData({ ...data, country: e.target.value })} />
								</Col>
								</Row>		

<div>
							<Button className="btn-success" onClick={handleSubmit} > SAVE</Button></div>
						</Form>
					</div>


				</div>

			</div>

		</>
	)
}


export default AddEmployee;