

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Table, Container, Row, Col, Card, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import CountUp from "react-countup";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const result = await response.json();
      setRecords(result);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const chartData = [
    [
      "Month",
      "Bolivia",
      "Ecuador",
      "Madagascar",
      "Papua New Guinea",
      "Rwanda",
      "Average",
    ],
    ["2004/05", 165, 938, 522, 998, 450, 614.6],
    ["2005/06", 135, 1120, 599, 1268, 288, 682],
    ["2006/07", 157, 1167, 587, 807, 397, 623],
    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ];

  const chartOptions = {
    title: "Monthly Coffee Production by Country",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  const filteredRecords = records.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

      <Sidebar />
      <div style={{
        width: "1268px",
        height: '69vh', marginLeft: '255px',

        marginTop: "-750px",

        backgroundColor: "#fff",
      }}>
        {/* Main Content */}


        <Container fluid>
          <Row className="mb-4">
            {[{ title: "Total Users", value: records.length || 0, bg: "#2c3e50" },
            { title: "Total Salary", value: 87, bg: "#c0392b" },
            { title: "Total Product", value: 125, bg: "#2980b9" },
            { title: "Total Revenue", value: 3600000, bg: "#f39c12" }]
              .map((card, index) => (
                <Col key={index} md={6} lg={3} className="mb-3">
                  <Card className="h-100 text-white" style={{ backgroundColor: card.bg }}>
                    <Card.Body>
                      <Card.Title className="text-uppercase fs-6">{card.title}</Card.Title>
                      <Card.Text className="display-6">
                        <CountUp end={card.value} duration={2} separator="," />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>

          <Row>
            <Col lg={6} xs={12} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Chart
                    chartType="ComboChart"
                    width="100%"
                    height="350px"
                    data={chartData}
                    options={chartOptions}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} xs={12}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="mb-3">User Data</Card.Title>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or email"
                    className="mb-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Table responsive bordered hover>
                    <thead>
                      <tr>
                        <th>Uid</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.length > 0 ? (
                        filteredRecords.map((user, index) => (
                          <tr key={index}>
                            <td>{user.uid}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;

