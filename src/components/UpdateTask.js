import React, { useEffect, useState, useRef } from 'react';
// import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';
import { Form, Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateFields } from '../utils/common';
import { getAllUsers } from '../actions/auth';
import { updateTask } from '../actions/tasks';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';
import { toLocalDateTime } from '../utils/common';
// import { history } from '../router/AppRouter';

function UpdateTask(props) {

  const [taskId, setTaskId] = useState(0);
  const [taskName, setTaskName] = useState('');
  const [taskDueDatetime, setTaskDueDatetime] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskMemberId, setTaskMemberId] = useState('');
  const [taskMembers, setTaskMembers] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskProgress, setTaskProgress] = useState(0);
  const [taskComment, setTaskComment] = useState('');
  const [updatedBy,setUpdatedBy] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  //todo: approval from manager

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem("selectedTask"));
    if (task) {
      setTaskId(task.task_id);
      setTaskName(task.task_name);
      setTaskDueDatetime(toLocalDateTime(task.task_due_datetime));
      setTaskPriority(task.task_priority);
      setTaskMemberId(task.task_member_id);
      setTaskDescription(task.task_description);
      setTaskProgress(task.task_progress);
      setTaskComment(task.task_comment);
    }

    props.dispatch(getAllUsers())
    .then((users) => {
        if (users) {
            setTaskMembers([...users]);
        }
    });

    if (!_.isEmpty(props.auth)) {
        setUpdatedBy(props.auth.first_name + " " + props.auth.last_name);
    }

    return () => {
        props.dispatch(resetErrors());
    }
  }, []);

  useEffect(() => {
      setErrorMsg(props.errors);
  }, [props.errors]);

  const editTask = (event) => {
    event.preventDefault();
    const fieldsToValidate = [
        { taskName }
    ];

    const taskNameEntered = validateFields(fieldsToValidate);
    if (!taskNameEntered) {
        setErrorMsg({updatetask_error: 'Please enter task name.'});
    } else {
        setIsSubmitted(true);
        props.dispatch(updateTask({ taskId, taskName, taskDueDatetime, taskPriority, taskMemberId, taskDescription, taskComment, taskProgress, updatedBy}))
        .then((response) => {
            if (response.success) {
                //todo: redirect to?
                setSuccessMsg('Successfully updated the task!');
                // setSuccessMsg('Successfully updated the task! now redirect to tasksBoard');
                setErrorMsg('');
                // setTimeout(() => {history.push('/alltasks')}, 3000);
            }
        });
    }
  }

  return (
      <div className="update-page">
      <br/><h1>Update Task</h1><br/>
      <div className="add-task-form">
          <Form onSubmit={editTask}>
          {/* {errorMsg && (errorMsg.updatetask_error || errorMsg.getallusers_error) ? (
              <p className="alert alert-danger" role="alert">
              {errorMsg.updatetask_error || errorMsg.getallusers_error}
              </p>
          ) : (
              isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
              )
          )} */}
          <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
              type="text"
              name="taskName"
              placeholder="Task name"
              value={taskName}
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
              placeholder="YYYY-MM-DD HH:mm"
              value={taskDueDatetime}
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
              {taskMembers.map((member) => (
              <option key={member.user_id} value={member.user_id}>{member.first_name} {member.last_name}</option>
              ))}
              </Form.Control>
          </Form.Group>
          </Form.Row>
          <Form.Group controlId="taskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
              as="textarea"
              rows="6"
              name="taskDescription"
              placeholder="Description"
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
              />
          </Form.Group>
          <Form.Group controlId="taskComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
              as="textarea"
              rows="6"
              name="taskComment"
              placeholder="Comment"
              value={taskComment}
              onChange={(event) => setTaskComment(event.target.value)}
              />
          </Form.Group>
          
          <Form.Group controlId="taskProgress">
              <Form.Label>Progress</Form.Label>
              <OverlayTrigger 
            //   placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>{taskProgress}%</Tooltip>}
              >
              <Form.Control 
              type="range" 
              custom 
              value={taskProgress}
              onChange={(event) => setTaskProgress(event.target.value)}
              />
          </OverlayTrigger>
          </Form.Group>
          {errorMsg && (errorMsg.updatetask_error || errorMsg.getallusers_error) ? (
              <p className="alert alert-danger" role="alert">
              {errorMsg.updatetask_error || errorMsg.getallusers_error}
              </p>
          ) : (
              isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
              )
          )}
          <div className="action-items">
              <Link to="/alltasks" className="btn btn-warning">
              All Tasks
              </Link>
              <Button variant="primary" type="submit">
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

export default connect(mapStateToProps)(UpdateTask);