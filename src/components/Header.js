import React from 'react';
import {Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

class Header extends React.Component {

  // state = {
  //     isOpen: false
  // };

  // handleOpen = () => {
  //   this.setState({ isOpen: true })
  // }

  // handleClose = () => {
  //    this.setState({ isOpen: false })
  // }
// const Header = () => {
  //onMouseEnter={this.handleOpen} onMouseLeave={this.handleClose} show={this.state.isOpen}
  render() {
    return (
      <Container>
      <Navbar bg="black" variant="dark" fixed='top' expand="lg">
        <Navbar.Brand href="/dashboard">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            {/* <Nav.Link href="/alltasks">Tasks</Nav.Link>  
            <Nav.Link href="/addtask">AddTask</Nav.Link>  */}
            <NavDropdown title="Tasks" id="nav-dropdown-tasks" renderMenuOnMount={true}>
              <NavDropdown.Item href="/alltasks">All Tasks</NavDropdown.Item>
              <NavDropdown.Item href="/addtask">Add New Task</NavDropdown.Item>
            </NavDropdown> 
            <NavDropdown title="Inventory" id="nav-dropdown-inventory" renderMenuOnMount={true}>
              <NavDropdown.Item href="/itemdetail">Item Detail</NavDropdown.Item>
              <NavDropdown.Item href="/instock">In Stock</NavDropdown.Item>
              {
              //<NavDropdown.Divider /> 
              }
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
  };
}
// const mapStateToProps = (state) => ({
//     auth: state.auth,
// });

// export default connect(mapStateToProps)(Header);

export default Header;