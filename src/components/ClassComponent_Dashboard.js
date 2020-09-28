import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, ProgressBar} from 'react-bootstrap';
import { getTasksByUser } from '../actions/tasks';
// import { validateFields } from '../utils/common';
import { resetErrors } from '../actions/errors';
// import { signIn } from '../actions/auth';

//need to consider redux-persist!
class Dashboard extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    tasks: [],
    errorMsg: ''
  };

  componentDidMount() {
    if (!_.isEmpty(this.props.auth)) {
        this.props.dispatch(getTasksByUser(this.props.auth.user_id))
        .then((tasksByUser) => {
            if (tasksByUser) {
                this.setState({
                    tasks: [...tasksByUser]
                });
            }
        });
        this.setState({
            firstName: this.props.auth.first_name,
            lastName: this.props.auth.last_name
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
        this.setState({
            errorMsg: this.props.errors
        });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors());
  }

  handleDetail = (task) => {
    console.log(task);
    localStorage.setItem("selectedTask", JSON.stringify(task))
  };

  render() {
    const { firstName, lastName, errorMsg } = this.state;
    const currentHour = new Date().getHours();
    var greeting = "";
    if(currentHour < 12){
        greeting = "Good Morning";
    } else if(12 <= currentHour <= 17){
        greeting = "Good Afternoon";
    }else{
        greeting = "Good Evening";
    }

    return (
      <Container className="dashboard-container">
            {errorMsg && errorMsg.gettasks_error && (
              <p className="alert alert-danger" role="alert">
                {errorMsg.gettasks_error}
              </p>
            )}
          <Row>
              <Col lg={3} className="left-col" >
                <Card bg="dark" text="light" border="warning" as="a" href="/taskdetail" style={{textDecoration: 'none'}}>
                        <Card.Header as="h3">{new Date().toLocaleDateString()}</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>{task.task_name}</Card.Title> */}
                            {/* <Card.Subtitle className="mb-2 text-danger">Due: {task.task_due_date}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Priority: {task.task_priority}</Card.Subtitle> */}
                            <Card.Text>Hi {firstName} {lastName}, {greeting}!</Card.Text>
                        {/* </Card.Body> */}
                        {/* <ListGroup className="list-group-flush">
                            <ListGroupItem>Priority: {task.task_priority}</ListGroupItem>
                            <ListGroupItem>Due: {task.task_due_date}</ListGroupItem>
                        </ListGroup> */}
                            {/* <Card.Link  className="btn btn-warning" href="/taskdetail" onClick={this.handleDetail.bind(this, task)}>Detail</Card.Link> */}
                            {/* <Card.Link className="btn btn-danger" href="/edittask">Edit</Card.Link> */}
                            {/* <Card.Footer><ProgressBar animated variant="success" now={task.task_progress} label={`${task.task_progress}%`} /></Card.Footer> */}
                            {/* <Card.Footer>Progress: {task.task_progress}%</Card.Footer> */}
                        </Card.Body>
                </Card>
              </Col>
              <Col lg={9} className="right-col" >
                <h2>Your Tasks</h2>
                {this.state.tasks.map((task) => (
                    <div key={task.id}>
                        {/* <a href="/taskdetail" > */}
                        <Card bg="light" text="dark" border="success" as="a" href="/taskdetail" onClick={this.handleDetail.bind(this, task)} style={{textDecoration: 'none'}}>
                        <Card.Header as="h3">{task.task_name}</Card.Header>
                        <Card.Body>
                            {/* <Card.Title>{task.task_name}</Card.Title> */}
                            <Card.Subtitle className="mb-2 text-danger">Due: {task.task_due_datetime}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-danger">Priority: {task.task_priority}</Card.Subtitle>
                            <Card.Text>{task.task_description}</Card.Text>
                        {/* </Card.Body> */}
                        {/* <ListGroup className="list-group-flush">
                            <ListGroupItem>Priority: {task.task_priority}</ListGroupItem>
                            <ListGroupItem>Due: {task.task_due_date}</ListGroupItem>
                        </ListGroup> */}
                            {/* <Card.Link  className="btn btn-warning" href="/taskdetail" onClick={this.handleDetail.bind(this, task)}>Detail</Card.Link> */}
                            {/* <Card.Link className="btn btn-danger" href="/edittask">Edit</Card.Link> */}
                            <Card.Footer><ProgressBar animated variant="success" now={task.task_progress} label={`${task.task_progress}%`} /></Card.Footer>
                            {/* <Card.Footer>Progress: {task.task_progress}%</Card.Footer> */}
                        </Card.Body>
                        </Card>
                        {/* </a> */}
                        <br/>
                    </div>
                ))}
              </Col>
          </Row>
      </Container>     
    );
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(Dashboard);