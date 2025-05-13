import React, { useEffect, useState } from 'react';
import { Button, Table, Tab, Tabs, Form, Pagination } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';

function Offers() {

    const [data, setData] = useState([]);

    const [values, setValues] = useState({
        offerid: '',
        offername: '',
        percentage_discount: '',
        flat_discount: '',
        upto_discount: '',
        valid_from: '',
        valid_to: '',
        terms_and_condition: '',
        status: ''
    });

    const [currentPage, setCurrentPage] = useState(1);        // for pagination
    const itemsPerPage = 4;

//                               GET
useEffect(() => {
    axios.get('http://localhost:5000/api/admin/offer/viewoffer')
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

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/api/admin/offer/createoffer", values);
            console.log("Data posted successfully:", values);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    const handlePageChange = (pageNumber) => {        // for pagination
        setCurrentPage(pageNumber);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);      // Calculate total pages


    return (
        <>
             <Sidebar/>
             <div style={{
                width: "1268px",
                height: '69vh',
                marginLeft: '255px',
               
                marginTop: "-750px",

                backgroundColor: "#fff",
            }}>


                  <Tabs defaultActiveKey="view details" id="fill-tab-example" fill className="mb-3" style={{ borderBlockColor: 'blue' }}>
                    <Tab eventKey="Add" title="Add" style={{ borderBlockColor: 'blue' }}>
                        <h4 style={{ textAlign: "center", backgroundColor:'lightblue' }}>ADD OFFERS</h4>
                        <div style={{ border: '2px solid blue', padding: '5px', marginLeft: '120px', width: '800px', height: '300px' }}>
                            <div class="row">
                                <div class="col">
                                    <label for="formGroupExampleInput" class="form-label">Offer ID</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" 
                                    onChange={(e) => setValues({ ...values, offerid: e.target.value })} />
                                </div>

                                <div class="col">
                                    <label for="formGroupExampleInput2" class="form-label">Offer Name</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput2"
                                    onChange={(e) => setValues({ ...values, offername: e.target.value })} />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="formGroupExampleInput" class="form-label">Percentage Discount</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" 
                                    onChange={(e) => setValues({ ...values, percentage_discount: e.target.value })} />
                                </div>

                                <div class="col">
                                    <label for="formGroupExampleInput2" class="form-label">Flat Discount</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput2" 
                                    onChange={(e) => setValues({ ...values, flat_discount: e.target.value })} />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="formGroupExampleInput" class="form-label">Upto Discount</label>
                                    <input type="text" class="form-control" id="formGroupExampleInput" 
                                    onChange={(e) => setValues({ ...values, upto_discount: e.target.value })} />
                                </div>

                                <div class="col">
                                    <label for="formGroupExampleInput2" class="form-label">Valid From</label>
                                    <input type="date" class="form-control" id="formGroupExampleInput2" 
                                    onChange={(e) => setValues({ ...values, validfrom: e.target.value })} />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <label for="formGroupExampleInput" class="form-label">Valit To</label>
                                    <input type="date" class="form-control" id="formGroupExampleInput" 
                                    onChange={(e) => setValues({ ...values, valid_to: e.target.value })} />
                                </div>

                                <div class="col">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check type="switch" id="custom-switch" 
                                    onChange={(e) => setValues({ ...values, status: e.target.value })} />
                                </div>
                            </div>
                            <br />

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="autoSizingCheck" />
                                <label class="form-check-label" for="autoSizingCheck">Terms & Conditions</label>
                            </div>
                            <br />
                            <Button className="btn-success" onClick={handleSubmit}> SAVE </Button>

                        </div>
                    </Tab>

                    <Tab eventKey="View" title="View">
                    <h4 style={{ textAlign: "center", backgroundColor:'lightblue' }}>VIEW OFFERS</h4>
                        <Table striped bordered hover style={{ marginTop: "3px" ,border: '2px solid blue' }}>
                            <thead>
                                <tr>
                                    <th>Offer ID</th>
                                    <th>Offer Name</th>
                                    <th>Percentage Discount</th>
                                    <th>Flat Discount</th>
                                    <th>Upto Discount</th>
                                    <th>Valid From</th>
                                    <th>Valid To</th>
                                    <th>Status</th>
                                    <th>Terms & Conditions</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                {itemsToDisplay.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item.offerid}</td>
                                        <td>{item.offername}</td>
                                        <td>{item.percentage_discount}</td>
                                        <td>{item.flat_discount}</td>
                                        <td>{item.upto_discount}</td>
                                        <td>{item.valid_from}</td>
                                        <td>{item.valid_to}</td>
                                        <td>{item.status}</td>
                                        <td>{item.terms_and_condition}</td>
                                    </tr>
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
                    </Tab>
                </Tabs>

            </div>
        </>
    )
}

export default Offers;