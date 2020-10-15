import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button} from 'react-bootstrap';
import { validateFields } from '../utils/common';
import { updateProfile } from '../actions/auth';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';
import { Link } from 'react-router-dom';

function UpdateProfile(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('undefined');
    const [userId, setUserId] = useState(0);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    useEffect(() => {
        if (!_.isEmpty(props.auth)) {
            setFirstName(props.auth.first_name);
            setLastName(props.auth.last_name);
            setRole(props.auth.role_type);
            setUserId(props.auth.user_id);
        }
      return () => {props.dispatch(resetErrors());}
    },[]);
      
    useEffect(() => {
        setErrorMsg(props.errors);
    },[props.errors]);

    const handleProfileUpdate = (event) => {
        event.preventDefault();
    
        const fieldsToValidate = [
          { firstName },
          { lastName },
          { role }
        ];
    
        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            setErrorMsg({signup_error: 'Please enter all the fields.'});
        } else {
            setIsSubmitted(true);
            props.dispatch(updateProfile({firstName, lastName, userId, role}))
            .then((response) => {
                console.log(props.auth);
                if(response.success) {
                setSuccessMsg('Succesfully updated profile, redirect to Dashboard in 3 seconds...');
                setErrorMsg('');
                setTimeout(() => {props.history.push('/dashboard')}, 3000);
                }
            });
        }
    };

    return (
        <div className="update-page">
          <br/><h1>Update Profile</h1>
          <div className="add-task-form">
            <Form onSubmit={handleProfileUpdate}>
              {errorMsg && errorMsg.updateprofile_error ? (
                <p className="alert alert-danger" role="alert">
                  {errorMsg.updateprofile_error}
                </p>
              ) : (
                isSubmitted && (
                  <p className="successMsg centered-message">{successMsg}</p>
                )
              )}
              <Form.Group controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  value={lastName}
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
                    <option value='undefined'>Undefined</option>
                    <option value='employee'>Employee</option>
                    <option value='manager'>Manager</option>
                </Form.Control>
              </Form.Group>
              <div className="action-items" >
                <Link to="/dashboard" className="btn btn-success">
                Dashboard
                </Link>
                <Button variant="warning" type="submit">
                Update
                </Button>
              </div>
            </Form>
          </div>
        </div>
      );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(UpdateProfile);