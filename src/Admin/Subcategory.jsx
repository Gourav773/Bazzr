import React, { useEffect, useState } from 'react';
import { Button, Form, Table, Pagination, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'

function AddSubCategory() {

  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    Subcategoryid: '',
    Subcategoryname: '',
    photo: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // To hold the selected subcategory for update

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/subcategory/viewsubcat')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("Subcategoryid", values.Subcategoryid);
    formdata.append("Subcategoryname", values.Subcategoryname);
    formdata.append("photo", values.photo);
    try {
      await axios.post("http://localhost:5000/api/admin/subcategory/addsubcat", formdata);
      navigate('/AddSubCategory');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/subcategory/updatesubcat/${values.Subcategoryid}`, values);
      console.log("Data updated successfully:", values);
      handleClose();
      // Refresh subcategory data after update
      axios.get('http://localhost:5000/api/admin/subcategory/viewsubcat')
        .then((response) => {
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log('Error', err)
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelectedSubcategory(null); // Clear selected subcategory after closing modal
  };

  const handleShow = (subcategory) => {
    setSelectedSubcategory(subcategory); // Set selected subcategory when "Update" button is clicked
    setValues({
      Subcategoryid: subcategory.Subcategoryid,
      Subcategoryname: subcategory.Subcategoryname,
    });
    setShow(true);
  };

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.Subcategoryname.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

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
            style={{ width: '250px', marginLeft: '400px', marginTop: '5px' }} />
          <Link to="/"><Button variant="outline-primary" style={{ marginTop: '10px' }}>Search</Button></Link>
        </Form>

        <div style={{ display: 'flex', margin: "5px" }}>
          <div style={{ border: '2px solid blue', textAlign: 'center', width: '400px' }}>
            <h4 style={{ marginTop: '10px' }}>Add Sub Category</h4>

            <label htmlFor="formGroupExampleInput" className="form-label">Category ID</label>

            <select
              value={values.Pcategoryid}
              className="form-control"
              id="formGroupExampleInput"
              onChange={e => setValues({ ...values, Pcategoryid: e.target.value })}
            >
              {data.map(item => (
                <option key={item.id} value={item.Pcategoryid}>
                  {item.Pcategoryid}
                </option>
              ))}
            </select>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Sub Category ID</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter Category ID"
                onChange={(e) => setValues({ ...values, Subcategoryid: e.target.value })} />
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">Sub Category Name</label>
              <input type="text" className="form-control" id="formGroupExampleInput2"
                onChange={(e) => setValues({ ...values, Subcategoryname: e.target.value })} />
            </div>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control type="file"
                onChange={(e) => setValues({ ...values, photo: e.target.files[0] })} />
            </Form.Group>
            <Button className="btn-success" onClick={handleSubmit}>SAVE</Button>
          </div>

          <Table striped bordered hover style={{ height: '500px', width: '700px', marginLeft: '10px', border: '1px solid blue' }}>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Category id</th>
                <th>Subcategory id</th>
                <th>Subcategory name</th>
                <th>Photo</th>
                <th>action</th>
              </tr>
            </thead>

            <tbody>
              {itemsToDisplay.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.Pcategoryid}</td>
                  <td>{item.Subcategoryid}</td>
                  <td>{item.Subcategoryname}</td>
                  <td><img src={item.photo} alt="" style={{ width: "50px", height: "50px" }} /></td>
                  <td>
                    <Button variant="primary" onClick={() => handleShow(item)}>Update</Button><Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Sub Category</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form.Group className="mb-3" controlId="formGroupUserID">
                          <Form.Label>Sub Category ID :</Form.Label>
                          <Form.Control type="text" placeholder="Sub Category ID"
                            onChange={e => setValues({ ...values, Subcategoryid: e.target.value })}
                            value={values.Subcategoryid} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupRoleName">
                          <Form.Label>Sub Category Name :</Form.Label>
                          <Form.Control type="text" placeholder="Sub Category Name"
                            onChange={e => setValues({ ...values, Subcategoryname: e.target.value })}
                            value={values.Subcategoryname} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupRoleName">
                          <Form.Label>Photo :</Form.Label>
                          <Form.Control type="file"
                            onChange={e => setValues({ ...values, photo: e.target.value })}
                            value={values.photo} />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={handleUpdate}> Save Changes </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination style={{ justifyContent: 'center', }}>
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
    </>
  )
}

export default AddSubCategory;
