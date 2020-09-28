import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initiateLogout } from '../actions/auth';

// class Logout extends React.Component {
function Logout(props) {
  useEffect(() => {
      props.dispatch(initiateLogout()).then(() => props.history.push('/'));
  }, []);

  return null;
}

export default connect()(Logout);

// import React from 'react';
// import { connect } from 'react-redux';
// import { initiateLogout } from '../actions/auth';

// class Logout extends React.Component {
//   componentDidMount() {
//     const { history, dispatch } = this.props;
//     dispatch(initiateLogout()).then(() => history.push('/'));
//     // or this way: this.props.dispatch(initiateLogout());
//   }

//   render() {
//     return null;
//   }
// }

// export default connect()(Logout);