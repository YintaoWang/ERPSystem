import React, { useState,useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';
import { initiateLogin } from '../actions/auth';
// import _ from 'lodash';
import { resetErrors } from '../actions/errors';

function Login(props) {
//or: const Login = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
      // setErrorMsg(props.errors);
      return () => {
        console.log('cleanup reached...........');
        props.dispatch(resetErrors());
        console.log(props.errors);
      }
    }, []);

    useEffect(() => {
        console.log('effect');
        console.log(props.errors);
        setErrorMsg(props.errors);
        // return () => {props.dispatch(resetErrors());}
    }, [props.errors]); //new object: changed??...

    //infinite loop!! be careful!!
  //   useEffect(() => {
  //     console.log('side effect');
  //     console.log(props.errors);
  //     setErrorMsg(props.errors);
  //     return () => {
  //       console.log('cleanup reached.........');
  //       props.dispatch(resetErrors());
  //       console.log(props.errors);
  //     }
  // }, [props.errors]); //new object: changed??...

    const handleLogin = (event) => {
        event.preventDefault();
        // const { email, password } = this.state;
        const fieldsToValidate = [{ email }, { password }];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            setErrorMsg({
                signin_error: 'Please enter all the fields.'
            });
        } else {
            setErrorMsg({
                signin_error: ''
            });
            // initiate login
            props.dispatch(initiateLogin(email, password));
        }; 
     };

    return (
      <div className="login-page">
        <br/><h1>Hello! Welcome to Yintao's ERP</h1><br/>
        <div className="login-form">
          <Form onSubmit={handleLogin}>
            {errorMsg && errorMsg.signin_error && (
              <p className="alert alert-danger" role="alert">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                // onChange={this.handleInputChange}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="password"
                // onChange={this.handleInputChange}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <div className="action-items">
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps)(Login);