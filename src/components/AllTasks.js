import React, { useState, useEffect } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, ProgressBar} from 'react-bootstrap';
import { resetErrors } from '../actions/errors';
import { getAllTasks } from '../actions/tasks';
import { toLocalDateTime } from '../utils/common';

function AllTasks(props) {

    const [todoTasks, setTodoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    
    useEffect(() => {
        props.dispatch(getAllTasks())
        .then((tasks) => {
            if(tasks) {
                setTodoTasks([...tasks[0]]);
                setDoingTasks([...tasks[1]]);
                setDoneTasks([...tasks[2]]);
            }
        });

        setErrorMsg(props.errors);
        return () => {props.dispatch(resetErrors());};
    }, []);

    const handleDetail = (task) => {
        localStorage.setItem("selectedTask", JSON.stringify(task))
    };
    
    return (
        <Container className="alltasks-container">
            {errorMsg && errorMsg.getalltasks_error && (
                <p className="alert alert-danger" role="alert">
                {errorMsg.getalltasks_error}
                </p>
            )}
            <Row>
                <Col lg={4} >
                <h2>ToDo</h2>
                {todoTasks.map((todoTask) => (
                    <div key={todoTask.task_id} className="left-col">
                        <Card bg="light" text="dark" border="success" as="a" href="/updatetask" onClick={() => handleDetail(todoTask)} style={{textDecoration: 'none'}}>
                        <Card.Header as="h4">{todoTask.task_name}</Card.Header>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-danger">Member: {todoTask.task_member}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Due: {toLocalDateTime(todoTask.task_due_datetime)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Priority: {todoTask.task_priority}</Card.Subtitle>
                            <Card.Text>{todoTask.task_description}</Card.Text>
                            {/* <Card.Footer><ProgressBar animated variant="success" now={todoTask.task_progress} label={`${todoTask.task_progress}%`} /></Card.Footer> */}
                        </Card.Body>
                        </Card>
                        {/* <br/> */}
                    </div>
                ))}
                </Col>
                <Col lg={4} >
                <h2>Doing</h2>
                {doingTasks.map((doingTask) => (
                    <div key={doingTask.task_id} className="middle-col">
                        <Card bg="light" text="dark" border="danger" as="a" href="/updatetask" onClick={() => handleDetail(doingTask)} style={{textDecoration: 'none'}}>
                        <Card.Header as="h4">{doingTask.task_name}</Card.Header>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-danger">Member: {doingTask.task_member}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Due: {toLocalDateTime(doingTask.task_due_datetime)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Priority: {doingTask.task_priority}</Card.Subtitle>
                            <Card.Text>{doingTask.task_description}</Card.Text>
                            <Card.Footer><ProgressBar animated variant="success" now={doingTask.task_progress} label={`${doingTask.task_progress}%`} /></Card.Footer>
                        </Card.Body>
                        </Card>
                        {/* <br/> */}
                    </div>
                ))}
                </Col>
                <Col lg={4} >
                <h2>Done</h2>
                {doneTasks.map((doneTask) => (
                    <div key={doneTask.task_id} className="right-col">
                        <Card bg="light" text="dark" border="success" as="a" href="/updatetask" onClick={() => handleDetail(doneTask)} style={{textDecoration: 'none'}}>
                        <Card.Header as="h4">{doneTask.task_name}</Card.Header>
                        <Card.Body>
                            <Card.Subtitle className="mb-2 text-danger">Member: {doneTask.task_member}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Due: {toLocalDateTime(doneTask.task_due_datetime)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Priority: {doneTask.task_priority}</Card.Subtitle>
                            <Card.Text>{doneTask.task_description}</Card.Text>
                            <Card.Footer><ProgressBar animated variant="danger" now={doneTask.task_progress} label={`${doneTask.task_progress}%`} /></Card.Footer>
                        </Card.Body>
                        </Card>
                        {/* <br/> */}
                    </div>
                ))}
                </Col>
            </Row>
        </Container>     
    );
}

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps)(AllTasks);