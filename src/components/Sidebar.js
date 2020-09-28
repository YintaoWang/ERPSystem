import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import {Nav, Navbar} from "react-bootstrap";
import { withRouter } from "react-router";

// class Sidebar extends React.Component {
function Sidebar(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    useEffect(() => {
        if (!_.isEmpty(props.auth)) {
            setFirstName(props.auth.first_name);
            setLastName(props.auth.last_name);
        }
    }, []);

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark hide-lg fixed-top">
                <a class="navbar-brand" href="/dashboard">Hi, {firstName} {lastName}</a>
                <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <br/>
            <div className="collapse" id="sidebar">
                <nav className="nav sidenav flex-column" >
                    <a className="nav-link" style={{fontSize:"22px", marginLeft:"0px"}} href="/dashboard">Dashboard</a>
                    <a className="nav-link disabled" style={{fontSize:"22px", marginLeft:"0px", color:"#5da2d5"}} href="#" tabindex="-1" aria-disabled="true">Tasks</a>
                    {/* <h4>Tasks</h4> */}
                    <a className="nav-link" href="/alltasks">All Tasks</a>
                    <a className="nav-link" href="/addtask">Add Task</a>
                    {/* <h4>Inventory</h4> */}
                    <a className="nav-link disabled" style={{fontSize:"22px", marginLeft:"0px", color:"#5da2d5"}} href="#" tabindex="-1" aria-disabled="true">Inventory</a>
                    <a className="nav-link" href="/instock">In Stock</a>
                    <a className="nav-link" href="/allitems">All Items</a>
                    <a className="nav-link" href="/additem">Add Item</a>
                    {/* <h4>Sales Order</h4> */}
                    <a className="nav-link disabled" style={{fontSize:"22px", marginLeft:"0px", color:"#5da2d5"}} href="#" tabindex="-1" aria-disabled="true">Sales Order</a>
                    <a className="nav-link" href="/salesorder">Sales Order</a>
                    <a className="nav-link" href="/orderdetail">Order Detail</a>
                    <a className="nav-link" style={{fontSize:"25px", marginLeft:"0px"}} href="/logout">Logout</a>
                </nav>
            </div>
        </div>

// {/* <nav className="navbar navbar-dark bg-dark">
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalConten" aria-controls="navbarToggleExternalConten" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
// </nav>

//       <div className="collapse" id="navbarToggleExternalConten">
//   <div className="bg-dark p-4">
//     <h5 className="text-white h4">Collapsed content</h5>
//     <span className="text-muted">Toggleable via the navbar brand.</span>
//   </div>
// </div> */}
// <div class="fixed-top">
//   <div class="collapse" id="navbarToggleExternalContent">
//     <div class="bg-dark p-4">
//       <h5 class="text-white h4">Collapsed content</h5>
//       <span class="text-muted">Toggleable via the navbar brand.</span>
//     </div>
//   </div>
//   <nav class="navbar navbar-dark bg-dark">
//     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//   </nav>
// </div>

        // <Nav //className="col-md-12 d-none d-md-block sidebar flex-column"
        // activeKey="/home"
        // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
        // <Navbar bg="black" variant="dark" fixed='top' expand="lg">

//         <nav className="navbar navbar-expand-lg">
//             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//         <Nav className="nav flex-column" >
//     {/* <div className="sidebar-sticky"></div> */}
// <Nav.Item>
//     <Nav.Link href="/home">Active</Nav.Link>
// </Nav.Item>
// <Nav.Item>
//     <Nav.Link eventKey="link-1">Link</Nav.Link>
// </Nav.Item>
// <Nav.Item>
//     <Nav.Link eventKey="link-2">Link</Nav.Link>
// </Nav.Item>
// <Nav.Item>
//     <Nav.Link eventKey="disabled" disabled>
//     Disabled
//     </Nav.Link>
// </Nav.Item>
// </Nav>
// </div>
// </nav>

    );
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
