import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Pagination } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Category() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [values, setValues] = useState({
        Pcategoryid: '',
        Categoryname: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/category/viewcategory')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = async () => {
        try {
            if (!values.Pcategoryid || !values.Categoryname) {
                console.error("Pcategoryid and Categoryname are required");
                return;
            }
            await axios.post("http://localhost:5000/api/admin/category/addcategory", values);
            console.log("Data posted successfully:", values);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/admin/category/updatecategory/${values.Pcategoryid}`, values);
            console.log("Data updated successfully:", values);
            handleClose();
        } catch (err) {
            console.log('Error', err)
        }
    };

    useEffect(() => {
        const filtered = data.filter(item =>
            item.Categoryname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, data]);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = (category) => {
        setValues({
            Pcategoryid: category.Pcategoryid,
            Categoryname: category.Categoryname,
        });
        setShow(true);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <>
            <Sidebar />
            {/* <div style={{
                width: "1125px",
                height: '90vh',
                marginLeft: '233px',
                marginTop: "-606px",
                backgroundColor: "#fff",
            }}> */}
             <div style={{
                width: "1268px",
                height: '69vh',
                marginLeft: '255px',
               
                marginTop: "-750px",

                backgroundColor: "#fff",
            }}>


                <Form className="d-flex">
                    <Form.Control type="search" placeholder="Search" aria-label="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '250px', marginLeft: '280px', marginTop: '10px', border: '1px solid blue' }} />
                    <Link to="/"><Button variant="outline-primary" style={{ marginTop: '10px' }}>Search</Button></Link>
                </Form>

                <div style={{ display: 'flex' }}>
                    <div style={{ border: '2px solid blue', margin: '10px', padding: '5px', textAlign: 'center', width: '250px', height: '350px' }}>
                        <h4 style={{ marginTop: '10px' }}>ADD Categorie</h4>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label"> Category ID</label>
                            <input type="text" className="form-control" id="formGroupExampleInput" name="Pcategoryid"
                                onChange={handleInputChange} />
                        </div>
                        <br />
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Category Name </label>
                            <input type="text" className="form-control" id="formGroupExampleInput2" name="Categoryname"
                                onChange={handleInputChange} />
                        </div>
                        <br />
                        <Button className="btn-success" onClick={handleSubmit} style={{ marginLeft: '5px' }}> SAVE</Button>
                    </div>
                    <div style={{ width: '600px', height: '400px', marginLeft: '10px' }}>
                        <Table striped bordered hover style={{ textAlign: 'center', marginTop: '10px', border: '2px solid blue' }}>
                            <thead>
                                <tr>
                                    <th>SNo</th>
                                    <th>Category ID</th>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsToDisplay.map((category, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{category.Pcategoryid}</td>
                                        <td>{category.Categoryname}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => handleShow(category)}>Update</Button>
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Update Category</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="mb-3">
                                                        <label htmlFor="formGroupExampleInput" className="form-label">Category ID:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="formGroupExampleInput"
                                                            value={values.Pcategoryid}
                                                            onChange={e => setValues({ ...values, Pcategoryid: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="formGroupExampleInput2" className="form-label">Category Name:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="formGroupExampleInput2"
                                                            value={values.Categoryname}
                                                            onChange={e => setValues({ ...values, Categoryname: e.target.value })}
                                                        />
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                                                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination style={{ justifyContent: 'center' }}>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={currentPage === index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Category;
