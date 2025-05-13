import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar';
import { Button, Table, Col, Row, Form, Dropdown, Modal, Pagination } from 'react-bootstrap';


function User() {

    const [selectedRoleId, setSelectedRoleId] = useState([]);

    const [data, setData] = useState([]);
    // const [roleid, setRoleid] = useState()

    const [roledata, setroledata] = useState([]);                      // View

    const [show, setShow] = useState(false);


    const [show1, setShow1] = useState(false);    // Modal For Delete
    const handleClose1 = () => setShow1(false);   // Modal For Delete
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);    // Modal for View
    const handleClose2 = () => setShow2(false);   // Modal for View
    const handleShow2 = () => setShow2(true);

    // const [assignedrole, setassignedroleData] = useState([])       //  View Role

    // const [uidforrevokrole, setuidforrevokrole] = useState()        //  Revoke Role

    // const [modalShow, setModalShow] = React.useState(false);       // View Role


    // const [showRoleModal, setShowRoleModal] = useState(false);
    // const [assignedRoleData, setAssignedRoleData] = useState([]);


    const [values, setValues] = useState({
        uid: '',
        name: '',
        email: '',
        password: '',
        mobile: '',
        photo: null,
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

    });

    const [currentPage, setCurrentPage] = useState(1);   // for pagination
    const itemsPerPage = 3;

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/viewuser')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    setData(res.data);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpdate = async () => {         // update
        try {
            await axios.put(`http://localhost:5000/api/admin/userupdate/${values.uid}`, values);
            console.log(" updated successfully:", values);
            handleClose();            // Close modal after update
        }
        catch (err) {
            console.log('Error', err)
        }
    };

    //                           update
    const handleClose = () => {
        setShow(false);
    };

    const handleShow = (user) => {        // update
        setValues({
            uid: user.uid,
            name: user.name,
            email: user.email,
            password: user.password,
            mobile: user.mobile,
            photo: user.photo,
            aadhaar: user.aadhaar,
            doj: user.doj,
            qualification: user.qualification,
            dob: user.dob,
            address: user.address,
            state: user.state,
            city: user.city,
            pin: user.pin,
            status: user.status,
            country: user.country

        });
        setShow(true);
    };

    const handleDelete = (uid) => {
        axios.delete(`http://localhost:5000/api/admin/deleteuser?${uid}`)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    };




    const handlePageChange = (pageNumber) => {      // for pagination
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);
    // const itemsToDisplay = data

    const totalPages = Math.ceil(data.length / itemsPerPage);  // Calculate  pages

    //                           Assign Role GET API


    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/roles/viewroles`)
            .then(res => {
                if (res.status === 200) {
                    setroledata(res.data)
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleAssignRole = (uid, roleid) => {

        setSelectedRoleId("notnull");

        // Make sure roleid is not null before making the API call
        if (roleid) {
            axios.post(`http://localhost:5000/api/admin/roles/newrole`, { uid, roleid })
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        } else {
            console.error("Roleid is null or undefined");
        }
    };


    //                                    Status Button
    async function activestatus(uid) {
        let response = await axios.put(`http://localhost:5000/api/admin/activestatus/:uid${uid}`);
        console.log(response)
    }

    async function deactivestatus(uid) {
        let response = await axios.put(`http://localhost:5000/api/admin/deactivestatus/:uid${uid}`);
        console.log(response)
    }

    //  View Role
    // const handleViewRole = (uid) => {
    //     console.log(uid)
    //     setuidforrevokrole(uid)
    //     axios.get(`http://localhost:4000/roleassignView/${uid}`)
    //         .then(result => {
    //             console.log(result)
    //             setassignedroleData(result.data.result)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     setModalShow(true)
    // }

    //  View Role

    const [rolesid, setrolesid] = useState()

    const revokerole = (rolename) => {

        axios.get(`http://localhost:5001/api/admin/roles/viewrole/${rolename}`)
            .then(result => {
                console.log(result.data.result[0].roleid)
                setrolesid(result.data.result[0].roleid)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleSaveChanges = async (roleid) => {
        setSelectedRoleId("notnull")
        try {
            await axios.patch(`http://localhost:5000/api/admin/roles/updaterole/${values.roleid}`, values);
            console.log(values);
        }
        catch (error) {
            console.error("Error", error);
        }
        setSelectedRoleId([]);
    };

    return (
        <>
            <Sidebar />
            <div style={{
                width: "1270px",
                height: '69vh',
                marginLeft: '255px',
               border:"1px solid red",
                marginTop: "-750px",

                backgroundColor: "#fff",
            }}>


                <Form inline style={{ marginLeft: '10px', marginTop: '20px' }}>
                    <Row style={{ display: 'flex' }}>

                        <Col >
                            <Link to='/adduser'><Button className='btn-success'>ADD USER</Button></Link>
                        </Col>
                        <Col xs="auto">
                            <Form.Control type="text" placeholder="Search" className=" mr-sm-2" />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>

                <h2 className='d-flex justify-content-center'> All Users</h2>

                <div style={{ overflowX: 'auto', width: '100%'}}>
                    <Table striped bordered hover style={{ minWidth: '800px', borderBlockColor: 'blue', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Uid</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>DOB</th>
                                <th>DOJ</th>
                                <th>Photo</th>
                                <th>Aadhar</th>
                                <th>Qualification</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Pin</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {itemsToDisplay.map((employee, index) => {
                                return <tr key={index}>
                                    <td>{employee.uid}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.dob}</td>
                                    <td>{employee.doj}</td>
                                    <td><img style={{ height: '50px', width: '50px' }} src={employee.photo} alt={employee.name} /></td>
                                    <td>{employee.aadhar}</td>
                                    <td>{employee.qualification}</td>
                                    <td>{employee.state}</td>
                                    <td>{employee.city}</td>
                                    <td>{employee.pin}</td>
                                    <td>{employee.address}</td>
                                    <td style={{ display: 'flex' }}>
                                        <Button
                                            type="button"

                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={`exampleModal-${employee.uid}`}
                                            onClick={() => handleAssignRole(employee.uid)}
                                        // onClick={() => alert("hey ")} 
                                        >
                                            Assign
                                        </Button>

                                        <Modal show={selectedRoleId === "notnull"} onHide={() => setSelectedRoleId()}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Update Roles</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">User ID</label>
                                                    <input type="text" className="form-control" value={employee.uid}
                                                        // disabled
                                                        onChange={(e) => setValues({ ...values, roleid: e.target.value, })
                                                        }
                                                        id="exampleFormControlInput1" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput2" className="form-label">Role Name</label>
                                                    <input type="text" className="form-control" value={values.rolename}
                                                        onChange={(e) => setValues({ ...values, rolename: e.target.value, })} id="exampleFormControlInput2" />
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setSelectedRoleId(null)}>Close</Button>
                                                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                                            </Modal.Footer>
                                        </Modal>   {' '}

                                        {/* <Button variant="primary" style={{ height: '30px', marginTop: '10px', marginLeft: '10px' }} onClick={() => handleViewRole(employee.uid)}> view </Button> */}
                                        <Button variant="primary" onClick={setShow2} style={{ height: '30px' }}> View</Button>
                                       <Modal show={show1} onHide={handleClose2 } backdrop="static" keyboard={false} >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modal title</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>S.no</th>
                                                            <th>Rolename</th>
                                                            <th>Revoke Role</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data.map((item, index) => (
                                                                <tr key={index}>
                                                                    <th>{index + 1}</th>
                                                                    <td>{item.rolename}</td>
                                                                    <td>
                                                                        <button type="button" className="btn btn-primary" onClick={() => revokerole(item.role_name)}> Revoke Role</button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }

                                                    </tbody>
                                                </Table>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}> Close </Button>
                                                <Button variant="primary">Understood</Button>
                                            </Modal.Footer>
                                        </Modal> 
                                    </td>

                                    <td>{employee.status === 'deactive' ?                     // Status Button
                                        (<Form.Check type="switch" style={{ color: 'grey' }}
                                            onChange={(e) => activestatus(employee.uid, e)} />) :
                                        (<Form.Check type="switch" defaultChecked
                                            onChange={(e) => deactivestatus(employee.uid, e)} />)}
                                    </td>


                                    <td>{employee.action}
                                        <Dropdown.Item id="dropdown-basic-button" title="&#8942;" variant='Secondary'>


                                            <Button><Link onClick={handleShow} style={{ backgroundColor: 'white', color: 'black', marginLeft: '15px' }} >Update</Link></Button>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Update Data</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                            <Form.Label>User_Id: </Form.Label>
                                                            <Form.Control type="number" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                                            <Form.Label>Name:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Email:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>AdharCard:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Qualification:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Address:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Mobile:</Form.Label>
                                                            <Form.Control type="number" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label> Photo:</Form.Label>
                                                            <Form.Control type="file" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>DOB:</Form.Label>
                                                            <Form.Control type="date" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>DOJ:</Form.Label>
                                                            <Form.Control type="date" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>State:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>City:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Pin:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Status:</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control type="password" />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleUpdate}> Update</Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <br />

                                            <Button>  <Link onClick={handleShow2} style={{ backgroundColor: 'white', color: 'black', marginLeft: '15px' }} >View</Link></Button>
                                            <Modal show={show2} onHide={handleClose2}>
                                                <Modal.Header>
                                                    <Modal.Title className='m-auto'>USER DETAILS</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="text-center">
                                                    Name: {employee.name}         <br />
                                                    Email: {employee.email}       <br />
                                                    Mobile: {employee.mobile}     <br />
                                                    Status: {employee.status}     <br />
                                                    Location: {employee.location}
                                                </Modal.Body>
                                                <Button variant="secondary" size="sm" onClick={handleClose2}>Close</Button>
                                            </Modal>
                                            <br />

                                            <Button><Link onClick={handleShow1} style={{ backgroundColor: 'white', color: 'black', marginLeft: '15px' }} > Delete</Link></Button>
                                            <Modal show={show1} onHide={handleClose1}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>DELETE DATA</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Are you sure wants to Delete this Data ?</Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="danger" onClick={(e) => handleDelete(employee.uid)}> Confirm </Button>
                                                    <Button variant="secondary" onClick={handleClose1}> Cancel</Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </Dropdown.Item>
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div>

                <Pagination style={{ justifyContent: 'center' }}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)} >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

            </div>

        </>
    )
};

export default User;