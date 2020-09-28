// import React from 'react';
// import { connect } from 'react-redux';
// import { Form, Button, Col } from 'react-bootstrap';
// import { validateFields } from '../utils/common';
// import { Link } from 'react-router-dom';
// import { registerNewUser } from '../actions/auth';
// import _ from 'lodash';
// import { resetErrors } from '../actions/errors';

// class Register extends React.Component {
//   state = {
//     first_name: '',
//     last_name: '',
//     role: 'employee',
//     email: '',
//     password: '',
//     cpassword: '',
//     successMsg: '',
//     errorMsg: '',
//     isSubmitted: false
//   };

//   componentDidUpdate(prevProps) {
//     if (!_.isEqual(prevProps.errors, this.props.errors)) {
//       this.setState({ errorMsg: this.props.errors });
//     }
//   }

//   componentWillUnmount() {
//     this.props.dispatch(resetErrors());
//   }

//   registerUser = (event) => {
//     event.preventDefault();
//     const { first_name, last_name, role, email, password, cpassword } = this.state;

//     const fieldsToValidate = [
//       { first_name },
//       { last_name },
//       { role },
//       { email },
//       { password },
//       { cpassword }
//     ];

//     const allFieldsEntered = validateFields(fieldsToValidate);
//     if (!allFieldsEntered) {
//       this.setState({
//         errorMsg: {
//           signup_error: 'Please enter all the fields.'
//         }
//       });
//     } else {
//       if (password !== cpassword) { //to test
//         this.setState({
//           errorMsg: {
//             signup_error: 'Password and confirm password does not match.'
//           }
//         });
//       } else {
//         this.setState({ isSubmitted: true });
//         this.props
//         .dispatch(registerNewUser({ first_name, last_name, role, email, password }))
//         .then((response) => {
//             if (response.success) {
//                 this.setState({
//                 successMsg: 'congratulations! You\'ve registered successfully.',
//                 errorMsg: ''
//                 });
//             }
//         });
//       }
//     }
//   };

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//     console.log(name, value); //test use
//   };

//   render() {
//     const { errorMsg, successMsg, isSubmitted } = this.state;
//     return (
//       <div className="login-page">
//         <br/><h1>Create your account</h1><br/>
//         <div className="login-form">
//           <Form onSubmit={this.registerUser}>
//             {errorMsg && errorMsg.signup_error ? (
//               <p className="alert alert-danger" role="alert">
//                 {errorMsg.signup_error}
//               </p>
//             ) : (
//               isSubmitted && (
//                 <p className="successMsg centered-message">{successMsg}</p>
//               )
//             )}
//             <Form.Row>
//             <Form.Group as={Col} controlId="first_name">
//               <Form.Label>First name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="first_name"
//                 placeholder="first name"
//                 onChange={this.handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group as={Col} controlId="last_name">
//               <Form.Label>Last name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="last_name"
//                 placeholder="last name"
//                 onChange={this.handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="role">
//               <Form.Label>Role</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="role"
//                 value={this.state.value}
//                 onChange={this.handleInputChange}
//                 >
//                   <option value='employee'>Employee</option>
//                   <option value='manager'>Manager</option>
//               </Form.Control>
//             </Form.Group>
//             </Form.Row>
//             <Form.Group controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 onChange={this.handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 placeholder="password"
//                 onChange={this.handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="cpassword">
//               <Form.Label>Confirm password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="cpassword"
//                 placeholder="confirm password"
//                 onChange={this.handleInputChange}
//               />
//             </Form.Group>
//             <div className="action-items">
//               <Link to="/" className="btn btn-secondary">
//                 Login
//               </Link>
//               <Button variant="primary" type="submit">
//                 Sign Up
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   errors: state.errors
// });

// export default connect(mapStateToProps)(Register);