import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, ProgressBar} from 'react-bootstrap';
import { getTasksByUser } from '../actions/tasks';
import { resetErrors } from '../actions/errors';
import { toLocalDateTime } from '../utils/common';

function Dashboard(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!_.isEmpty(props.auth)) {
        props.dispatch(getTasksByUser(props.auth.user_id))
        .then((tasksByUser) => {
            if(tasksByUser) {
                setTasks([...tasksByUser]);
            }
        });
        setFirstName(props.auth.first_name);
        setLastName(props.auth.last_name);
    }
    const currentHour = new Date().getHours();
    if(currentHour < 12){
        setGreeting('Good Morning');
    } else if(12 <= currentHour <= 17){
        setGreeting('Good Afternoon');
    }else{
        setGreeting('Good Evening');
    }
    setErrorMsg(props.errors);
    return () => {props.dispatch(resetErrors())}; //ok
  }, []);

  const handleDetail = (task) => {
    localStorage.setItem("selectedTask", JSON.stringify(task))
  };

  return (
    <Container className="dashboard-container">
        {errorMsg && errorMsg.gettasks_error && (
            <p className="alert alert-danger" role="alert">
            {errorMsg.gettasks_error}
            </p>
        )}
        <Row>
            <Col lg={9} className="left-col" >
            <h2>Hi {firstName} {lastName}, {greeting}!<br/> Your Tasks</h2>
            {tasks.map((task) => (
                <div key={task.task_id} className="user-tasks">
                    {/* <a href="/taskdetail" > */}
                    <Card bg="light" text="dark" border="success" as="a" href="/updatetask" onClick={() => handleDetail(task)} style={{textDecoration: 'none'}}>
                    <Card.Header as="h3">{task.task_name}</Card.Header>
                    <Card.Body>
                        {/* <Card.Title>{task.task_name}</Card.Title> */}
                        <Card.Subtitle className="mb-2 text-danger">Due: {toLocalDateTime(task.task_due_datetime)}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-danger">Priority: {task.task_priority}</Card.Subtitle>
                        <Card.Text>{task.task_description}</Card.Text>
                        <Card.Footer><ProgressBar animated variant="success" now={task.task_progress} label={`${task.task_progress}%`} /></Card.Footer>
                        {/* <Card.Footer>Progress: {task.task_progress}%</Card.Footer> */}
                    </Card.Body>
                    </Card>
                    {/* </a> */}
                    {/* <br/> */}
                </div>
            ))}
            </Col>
            <Col lg={3} className="right-col" >
                <h2>Today is {new Date().toLocaleDateString()}</h2>
            {/* <Card bg="dark" text="light" border="warning" as="a" href="/updatetask" style={{textDecoration: 'none'}}>
                    <Card.Header as="h3">{new Date().toLocaleDateString()}</Card.Header>
                    <Card.Body>
                        <Card.Text>Hi {firstName} {lastName}, {greeting}!</Card.Text>
                    </Card.Body>
            </Card> */}
            </Col>
        </Row>
    </Container>     
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(Dashboard);