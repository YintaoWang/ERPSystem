import React from 'react';
// import React, { useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { validateFields } from '../utils/common';
// import { Link } from 'react-router-dom';
import { getAllUsers } from '../actions/auth';
import { addNewTask } from '../actions/tasks';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';

//todo: add "created by"..etc.
class AddTask extends React.Component {
  state = {
    task_name: '',
    task_due_datetime: '',
    task_priority: 'Low',
    task_member_id: '1',
    // task_members: [{user: "user1", id: "1"}, {user: "user2", id: "2"}, {user: "user3", id: "3"}],
    task_members: [],
    task_description: '',
    created_by: '',
    successMsg: '',
    errorMsg: '',
    isSubmitted: false
  };

  componentDidMount() {
    this.props.dispatch(getAllUsers())
    .then((users) => {
        if (users) {
            this.setState({
            task_members: [...users]
            });
        }
    });

    if (!_.isEmpty(this.props.auth)) {
        this.setState({
            created_by: this.props.auth.first_name + " " + this.props.auth.last_name
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
     this.props.dispatch(resetErrors());
  }

  addTask = (event) => {
    event.preventDefault();
    const { task_name, task_due_datetime, task_priority, task_member_id, task_description, created_by } = this.state;

    const fieldsToValidate = [
        { task_name }
    ];

    const taskNameEntered = validateFields(fieldsToValidate);
    if (!taskNameEntered) {
      this.setState({
        errorMsg: {
          addtask_error: 'Please enter task name.'
        }
      });
    } else {
          this.setState({ isSubmitted: true });
          this.props
          .dispatch(addNewTask({ task_name, task_due_datetime, task_priority, task_member_id, task_description, created_by}))
          .then((response) => {
              if (response.success) {
                  this.setState({
                  successMsg: 'Successfully add a task!',
                  errorMsg: ''
                  });
              }
          });
        }
      }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(name,": ", value); //test use
  };

  render() {
    const { errorMsg, successMsg, isSubmitted } = this.state;
    return (
      <div className="login-page">
        <br/><h1>Add a Task</h1><br/>
        <div className="add-task-form">
          <Form onSubmit={this.addTask}>
            {errorMsg && (errorMsg.addtask_error || errorMsg.getallusers_error) ? (
              <p className="alert alert-danger" role="alert">
                {errorMsg.addtask_error || errorMsg.getallusers_error}
              </p>
            ) : (
              isSubmitted && (
                <p className="successMsg centered-message">{successMsg}</p>
              )
            )}
            <Form.Group controlId="task_name">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="task_name"
                placeholder="Enter task name"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Row>
            <Form.Group as={Col} controlId="task_due_datetime">
              <Form.Label>Due</Form.Label>
              {/* <DateTimePicker></DateTimePicker> */}
              <Form.Control
                type="text"
                name="task_due_datetime"
                // placeholder="MM/DD/YYYY HH:mm"
                placeholder="YYYY-MM-DD HH:mm"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="task_priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                name="task_priority"
                value={this.state.value}
                onChange={this.handleInputChange}
              >
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="task_member_id"> 
              <Form.Label>Member</Form.Label>
              <Form.Control
                as="select"
                name="task_member_id"
                value={this.state.value}
                onChange={this.handleInputChange}
              >
                {/* <option key='0' value="">Select a user</option> */}
                {this.state.task_members.map((member) => (
                //   <div key={member.id}>
                <option key={member.user_id} value={member.user_id}>{member.first_name} {member.last_name}</option>
                //   </div>
                ))}
              </Form.Control>
            </Form.Group>
            </Form.Row>
            <Form.Group controlId="task_description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="6"
                // type="text"
                name="task_description"
                placeholder="Enter description"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Add Task
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(AddTask);