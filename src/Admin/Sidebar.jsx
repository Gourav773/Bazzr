import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill,
  BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from "react-icons/bs";
import "./Sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4 sticky-top shadow">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-warning fw-bold">
          <img src="/shop.jpg" alt="Logo" width="40" height="40" />
          BAZAR
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/login" className="text-white">
              Welcome: Gourav Yadav
            </Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/change-password">Change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="d-flex">
        {/* Sidebar */}
        <div className={`custom-sidebar bg-dark text-white p-3 ${collapsed ? "collapsed" : ""}`}>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "☰" : "✕"}
          </button>
          <ul className="nav flex-column">
            <li><Link to="/dashboard" className="sidebar-link"><BsGrid1X2Fill /> <span>Dashboard</span></Link></li>
            <li><Link to="/user" className="sidebar-link"><BsFillArchiveFill /> <span>Users</span></Link></li>
            <li><Link to="/role" className="sidebar-link"><BsFillGrid3X3GapFill /> <span>Role</span></Link></li>
            <li><Link to="/category" className="sidebar-link"><BsPeopleFill /> <span>Category</span></Link></li>
            <li><Link to="/addSubCategory" className="sidebar-link"><BsListCheck /> <span>Subcategory</span></Link></li>
            <li><Link to="/offers" className="sidebar-link"><BsMenuButtonWideFill /> <span>Offers</span></Link></li>
            <li><Link to="/settings" className="sidebar-link"><BsFillGearFill /> <span>Settings</span></Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content-area p-4">
      
        </div>
      </div>
    </>
  );
};

export default Sidebar;

