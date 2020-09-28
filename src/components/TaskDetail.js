import React from 'react';
// import _ from 'lodash';
// import { connect } from 'react-redux';
// import { Container, Row, Col, Card} from 'react-bootstrap';
// import { initiateUpdateProfile } from '../actions/profile';
// import { validateFields } from '../utils/common';
// import { resetErrors } from '../actions/errors';

//todo: delete
class TaskDetail extends React.Component {
  state = {
      task_id: '',
      task_name: '',
      task_description: ''
  };

  componentDidMount() {
    const task = JSON.parse(localStorage.getItem("selectedTask"));
    if (task) {
      //console.log("reached");
      const { task_id, task_name, task_description } = task;
      console.log(task);
      this.setState({
        task_id,
        task_name,
        task_description
      });
    }
  }

//   componentDidUpdate(prevProps) {
//     if (!_.isEqual(prevProps.errors, this.props.errors)) {
//       this.setState({
//         errorMsg: this.props.errors
//       });
//     }
//     if (!_.isEqual(prevProps.profile, this.props.profile)) {
//       const { first_name, last_name, email } = this.props.profile;
//       this.setState({ first_name, last_name, email });
//     }
//   }

//   componentWillUnmount() {
//     this.props.dispatch(resetErrors());
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { first_name, last_name } = this.state;
//     const profileData = {
//       first_name,
//       last_name
//     };

//     const fieldsToValidate = [{ first_name }, { last_name }];

//     const allFieldsEntered = validateFields(fieldsToValidate);
//     if (!allFieldsEntered) {
//       this.setState({
//         errorMsg: {
//           update_error: 'Please enter all the fields.'
//         }
//       });
//     } else {
//       this.setState({ isSubmitted: true, errorMsg: '' });
//       this.props.dispatch(initiateUpdateProfile(profileData)); //todo
//     }
//   };

//   handleOnChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

  //start here
//   handleDetail = (task) => {
//     console.log(task);
//     localStorage.setItem("selectedTask", task)
//     //onClick={this.handleDetail(task)}
//   };
  render() {
    const { task_id, task_name, task_description} = this.state;
    return (
<div>
    {
        console.log(task_id)
    }
    <h1>{task_id}<br/>{task_name}<br/>{task_description}</h1>

    </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   profile: state.profile,
//   errors: state.errors
// });

export default TaskDetail;