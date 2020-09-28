import React from 'react';
import {Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function NavigationBar() {

  return (
    <Container>
    <Navbar bg="black" variant="dark" fixed='top' expand="lg">
      <Navbar.Brand href="/dashboard">MyLOGO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="/dashboard">Dashboard</Nav.Link> */}
          <NavDropdown title="Tasks" id="nav-dropdown-tasks" renderMenuOnMount={true}>
            <NavDropdown.Item href="/alltasks">All Tasks</NavDropdown.Item>
            <NavDropdown.Item href="/addtask">Add New Task</NavDropdown.Item>
          </NavDropdown> 
          <NavDropdown title="Inventory" id="nav-dropdown-inventory" renderMenuOnMount={true}>
            <NavDropdown.Item href="/instock">In Stock</NavDropdown.Item>
            <NavDropdown.Item href="/allitems">All Items</NavDropdown.Item>
            <NavDropdown.Item href="/additem">Add New Item</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Sales Order" id="nav-dropdown-salesorder" renderMenuOnMount={true}>
            <NavDropdown.Item href="/salesorder">Sales Order</NavDropdown.Item>
            <NavDropdown.Item href="/orderdetail">Order Detail</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
    <br/><br/><br/>
    </Container>
  );
}

export default NavigationBar;