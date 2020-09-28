import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';
import { registerNewUser } from '../actions/auth';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';

// class Signup extends React.Component {
function Signup(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setErrorMsg(props.errors);
    // return () => {props.dispatch(resetErrors());}
  },[props.errors]);
  
  useEffect(() => {
    // setErrorMsg(props.errors);
    return () => {props.dispatch(resetErrors());}
  },[]);
  
  const registerUser = (event) => {
    event.preventDefault();

    const fieldsToValidate = [
      { firstName },
      { lastName },
      { role },
      { email },
      { password },
      { cpassword }
    ];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      setErrorMsg({signup_error: 'Please enter all the fields.'});
    } else {
      if (password !== cpassword) { //to test
        setErrorMsg({signup_error: 'Password and confirm password does not match.'});
      } else {
        setIsSubmitted(true);
        props.dispatch(registerNewUser({firstName, lastName, role, email, password}))
        .then((response) => {
          if(response.success) {
            setSuccessMsg('congratulations! You\'ve registered successfully.');
            setErrorMsg('');
          }
        });
      }
    }
  };

  return (
    <div className="login-page">
      <br/><h1>Create your account</h1><br/>
      <div className="login-form">
        <Form onSubmit={registerUser}>
          {errorMsg && errorMsg.signup_error ? (
            <p className="alert alert-danger" role="alert">
              {errorMsg.signup_error}
            </p>
          ) : (
            isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
            )
          )}
          <Form.Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="first name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="last name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
                <option value='employee'>Employee</option>
                <option value='manager'>Manager</option>
            </Form.Control>
          </Form.Group>
          </Form.Row>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="cpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword"
              placeholder="confirm password"
              onChange={(event) => setCPassword(event.target.value)}
            />
          </Form.Group>
          <div className="action-items">
            <Link to="/" className="btn btn-secondary">
              Login
            </Link>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Signup);