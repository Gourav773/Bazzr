import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from './Sidebar';

function Roles() {

    const [data, setData] = useState([]);

    const [values, setValues] = useState({        // POST
        roleid: '',
        rolename: ''
      
    });

    const [selectedRoleId, setSelectedRoleId] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);        // for pagination
    const itemsPerPage = 4;

    //                                         GET
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/admin/roles/viewroles')
            .then((response) => {
                console.log(response)
                setData(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    //                                          POST
    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/api/admin/roleassign/grantrole", values);
            console.log(" add successfully:", values);
        } catch (error) {
            console.error("Error", error);
        }
    };

    //  ----------------------------------------  PUT
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleUpdate = ( roleid) => {
        setSelectedRoleId( roleid)
    };

    const handleSaveChanges = async (roleid) => {
        try {
            await axios.patch(`http://localhost:5000/api/admin/roles/updaterole/${values.roleid}`, values);
            console.log(values);
        }
        catch (error) {
            console.error("Error", error);
        }
        setSelectedRoleId([]);
    };

    //   Pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);      // Calculate total pages


    return (
        <>
            <Sidebar />
            <div style={{
                width: "1268px",
                height: '69vh',
                marginLeft: '255px',
               
                marginTop: "-750px",

                backgroundColor: "#fff",
            }}>


                <div style={{ display: 'flex' }}>
                    <div style={{ border: '2px solid blue', margin: '10px', textAlign: 'center', width: '300px', fontSize: '20px', height: '400px' }}>
                        <h4 style={{ marginTop: '10px' }}>ADD Roles</h4>
                        <hr /> <br />
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Role ID</label>
                            <input type="text" className="form-control" id="formGroupExampleInput" name="role_id"  onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Role Name </label>
                            <input type="text" className="form-control" id="formGroupExampleInput2" name="role_name"  onChange={handleInputChange} />
                        </div>

                        <Button className="btn-success" onClick={handleSubmit} style={{ marginLeft: '10px' }}> SAVE</Button>
                    </div>

                    <div style={{ width: '600px' }}>
                        <Table striped bordered  style={{ textAlign: 'center', border: '2px solid blue', marginTop: '10px', height: '500px', marginLeft: '100px' }} >
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Role ID</th>
                                    <th>Role Name</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsToDisplay.map((employee, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{employee.roleid}</td>
                                            <td>{employee.rolename}</td>
                                            <td><Button variant="primary" onClick={() => handleUpdate(employee.roleid)}> Update</Button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>

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
                </div>



                <Modal show={selectedRoleId !== null} onHide={() => setSelectedRoleId(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Roles</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Role ID</label>
                            <input type="text" className="form-control" value={values.roleid}
                                onChange={(e) => setValues({ ...values, roleid: e.target.value, })} id="exampleFormControlInput1" />
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
                </Modal>
            </div>
        </>
    );
}
export default Roles;