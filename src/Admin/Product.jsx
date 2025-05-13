import React from 'react'
import Sidebar from './Sidebar'
import { Table, Pagination } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {

  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);   // for pagination
  const itemsPerPage = 6;

  // const [searchTerm, setSearchTerm] = useState('');            // Search
  // const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/admin/viewallshops')
      .then(res => {
        // if (res.status === 200) {      // matlb error
        setData(res.data.result)
        // setFilteredData(res.data.result);             // Search k liye
      })
      // else {
      //   alert('Error found')
      // }
      // })
      .catch((err) => console.log(err))
  });

  //                                Search
  // useEffect(() => {
  //   const filtered = data.filter((retailer) =>
  //     retailer.Shop_name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  // }, [searchTerm, data]);

  const handlePageChange = (pageNumber) => {      // for pagination
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);  // Calculate total pages

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


        {/* <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px', marginLeft: '550px', marginTop: '5px' }} />
          <Button variant="outline-primary" style={{ marginTop: '10px' }}>Search</Button>
        </Form> */}

        <Table responsive="sm" style={{ width:'1000px', height:'400px', border:'2px solid', margin:'10px' }}>
          <thead>
            <tr>
              <th>S_no</th>
              <th>Reg_no</th>
              <th>Shop_name</th>
              <th>Owner_name</th>
              <th>Contact_no</th>
              <th>Email</th>
              <th>City</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {itemsToDisplay.map((retailer, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{retailer.reg_no}</td>
                  <td>{retailer.shop_name}</td>
                  <td>{retailer.owner_name}</td>
                  <td>{retailer.contact_no}</td>
                  <td>{retailer.email}</td>
                  <td>{retailer.city}</td>
                  <td>{retailer.status}</td>
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
    </>
  )
}

export default Product