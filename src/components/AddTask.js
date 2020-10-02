import React, { useEffect, useState } from 'react';
// import React, { useState } from 'react';
// import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateFields } from '../utils/common';
// import { Link } from 'react-router-dom';
import { getAllUsers } from '../actions/auth';
import { addNewTask } from '../actions/tasks';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';

//todo: add "created by"..etc.
function AddTask(props) {

  const [taskName, setTaskName] = useState('');
  const [taskDueDatetime, setTaskDueDatetime] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [taskMemberId, setTaskMemberId] = useState('1'); //todo: if 1 doesn't exist?
  const [taskMembers, setTaskMembers] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [createdBy,setCreatedBy] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    props.dispatch(getAllUsers())
    .then((users) => {
        if (users) {
            setTaskMembers([...users]);
        }
    });

    if (!_.isEmpty(props.auth)) {
        setCreatedBy(props.auth.first_name + " " + props.auth.last_name);
    }

    return () => {
        props.dispatch(resetErrors());
    }
  }, []);

  useEffect(() => {
      setErrorMsg(props.errors);
  }, [props.errors]);

  const addTask = (event) => {
    event.preventDefault();
    // const { task_name, task_due_datetime, task_priority, task_member_id, task_description, created_by } = this.state;
    const fieldsToValidate = [
        { taskName }
    ];

    const taskNameEntered = validateFields(fieldsToValidate);
    if (!taskNameEntered) {
        setErrorMsg({addtask_error: 'Please enter task name.'});
    } else {
        setIsSubmitted(true);
        props.dispatch(addNewTask({ taskName, taskDueDatetime, taskPriority, taskMemberId, taskDescription, createdBy}))
        .then((response) => {
            if (response.success) {
                setSuccessMsg('Successfully add a task!');
                setErrorMsg('');
            }
        });
    }
  }

  return (
      <div className="add-page">
      <br/><h1>Add a Task</h1><br/>
      <div className="add-task-form">
          <Form onSubmit={addTask}>
          {errorMsg && (errorMsg.addtask_error || errorMsg.getallusers_error) ? (
              <p className="alert alert-danger" role="alert">
              {errorMsg.addtask_error || errorMsg.getallusers_error}
              </p>
          ) : (
              isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
              )
          )}
          <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
              type="text"
              name="taskName"
              placeholder="Task name"
              onChange={(event) => setTaskName(event.target.value)}
              />
          </Form.Group>
          <Form.Row>
          <Form.Group as={Col} controlId="taskDueDatetime">
              <Form.Label>Due</Form.Label>
              {/* <DateTimePicker></DateTimePicker> */}
              <Form.Control
              type="text"
              name="taskDueDatetime"
              // placeholder="MM/DD/YYYY HH:mm"
              placeholder="YYYY-MM-DD HH:mm"
              onChange={(event) => setTaskDueDatetime(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="taskPriority">
              <Form.Label>Priority</Form.Label>
              <Form.Control
              as="select"
              name="taskPriority"
              value={taskPriority}
              onChange={(event) => setTaskPriority(event.target.value)}
              >
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
              </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="taskMemberId"> 
              <Form.Label>Member</Form.Label>
              <Form.Control
              as="select"
              name="taskMemberId"
              value={taskMemberId}
              onChange={(event) => setTaskMemberId(event.target.value)}
              >
              {/* <option key='0' value="">Select a user</option> */}
              {taskMembers.map((member) => (
              //   <div key={member.id}>
              <option key={member.user_id} value={member.user_id}>{member.first_name} {member.last_name}</option>
              //   </div>
              ))}
              </Form.Control>
          </Form.Group>
          </Form.Row>
          <Form.Group controlId="taskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
              as="textarea"
              rows="6"
              // type="text"
              name="taskDescription"
              placeholder="Description"
              onChange={(event) => setTaskDescription(event.target.value)}
              />
          </Form.Group>
          <div className="action-items">
              <Link to="/alltasks" className="btn btn-warning">
              All Tasks
              </Link>
              <Button variant="primary" type="submit">
              Add Task
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

export default connect(mapStateToProps)(AddTask);