// import React from 'react';
// import _ from 'lodash';
// import { connect } from 'react-redux';
// import { Container, Row, Col, Card, ProgressBar} from 'react-bootstrap';
// import { resetErrors } from '../actions/errors';
// import { getAllTasks } from '../actions/tasks';

// //todo: change to function component
// class AllTasks extends React.Component {

//     state = {
//         todoTasks: [],
//         doingTasks: [],
//         doneTasks: [],
//         errorMsg: ''
//     };
    
//     componentDidMount() {
//         this.props.dispatch(getAllTasks())
//         .then((tasks) => {
//             if (tasks) {
//                 this.setState({
//                     todoTasks: [...tasks[0]],
//                     doingTasks: [...tasks[1]],
//                     doneTasks: [...tasks[2]]
//                 });
//             }
//         });
//     }

//     componentDidUpdate(prevProps) {
//         if (!_.isEqual(prevProps.errors, this.props.errors)) {
//             this.setState({
//                 errorMsg: this.props.errors
//             });
//         }
//     }
    
//     componentWillUnmount() {
//         this.props.dispatch(resetErrors());
//     }

//     handleDetail = (task) => {
//         localStorage.setItem("selectedTask", JSON.stringify(task))
//     };
    
//     render() {
//         const { todoTasks, doingTasks, doneTasks, errorMsg } = this.state;
//         return (
//           <Container className="alltasks-container">
//                 {errorMsg && errorMsg.gettasks_error && (
//                   <p className="alert alert-danger" role="alert">
//                     {errorMsg.getalltasks_error}
//                   </p>
//                 )}
//               <Row>
//                   <Col lg={4} className="left-col" >
//                     <h2>ToDo</h2>
//                     {todoTasks.map((todoTask) => (
//                         <div key={todoTask.id}>
//                             <Card bg="light" text="dark" border="success" as="a" href="/taskdetail" onClick={this.handleDetail.bind(this, todoTask)} style={{textDecoration: 'none'}}>
//                             <Card.Header as="h4">{todoTask.task_name}</Card.Header>
//                             <Card.Body>
//                                 <Card.Subtitle className="mb-2 text-danger">Member: {todoTask.task_member}</Card.Subtitle>
//                                 <Card.Subtitle className="mb-2 text-danger">Due: {todoTask.task_due_datetime}</Card.Subtitle>
//                                 <Card.Subtitle className="mb-2 text-danger">Priority: {todoTask.task_priority}</Card.Subtitle>
//                                 <Card.Text>{todoTask.task_description}</Card.Text>
//                                 <Card.Footer><ProgressBar animated variant="success" now={todoTask.task_progress} label={`${todoTask.task_progress}%`} /></Card.Footer>
//                             </Card.Body>
//                             </Card>
//                             <br/>
//                         </div>
//                     ))}
//                   </Col>
//                   <Col lg={4} className="middle-col" >
//                     <h2>Doing</h2>
//                     {doingTasks.map((doingTask) => (
//                         <div key={doingTask.id}>
//                             <Card bg="light" text="dark" border="success" as="a" href="/taskdetail" onClick={this.handleDetail.bind(this, doingTask)} style={{textDecoration: 'none'}}>
//                             <Card.Header as="h4">{doingTask.task_name}</Card.Header>
//                             <Card.Body>
//                                 <Card.Subtitle className="mb-2 text-danger">Member: {doingTask.task_member}</Card.Subtitle>
//                                 <Card.Subtitle className="mb-2 text-danger">Due: {doingTask.task_due_datetime}</Card.Subtitle>
//                                 <Card.Subtitle className="mb-2 text-danger">Priority: {doingTask.task_priority}</Card.Subtitle>
//                                 <Card.Text>{doingTask.task_description}</Card.Text>
//                                 <Card.Footer><ProgressBar animated variant="success" now={doingTask.task_progress} label={`${doingTask.task_progress}%`} /></Card.Footer>
//                             </Card.Body>
//                             </Card>
//                             <br/>
//                         </div>
//                     ))}
//                   </Col>
//                   <Col lg={4} className="right-col" >
//                     <h2>Done</h2>
//                     {doneTasks.map((doneTask) => (
//                         <div key={doneTask.id}>
//                             <Card bg="light" text="dark" border="success" as="a" href="/taskdetail" onClick={this.handleDetail.bind(this, doneTask)} style={{textDecoration: 'none'}}>
//                             <Card.Header as="h4">{doneTask.task_name}</Card.Header>
//                             <Card.Body>
//                                 <Card.Subtitle className="mb-2 text-danger">Member: {doneTask.task_member}</Card.Subtitle>
//                                 <Card.Subtitle className="mb-2 text-danger">Due: {doneTask.task_due_datetime}</Card.Subtitle>
//                                 <Card.Subtitle className="mb-2 text-danger">Priority: {doneTask.task_priority}</Card.Subtitle>
//                                 <Card.Text>{doneTask.task_description}</Card.Text>
//                                 <Card.Footer><ProgressBar animated variant="success" now={doneTask.task_progress} label={`${doneTask.task_progress}%`} /></Card.Footer>
//                             </Card.Body>
//                             </Card>
//                             <br/>
//                         </div>
//                     ))}
//                   </Col>
//               </Row>
//           </Container>     
//         );
//     }

// }

// const mapStateToProps = (state) => ({
//     errors: state.errors
// });

// export default connect(mapStateToProps)(AllTasks);