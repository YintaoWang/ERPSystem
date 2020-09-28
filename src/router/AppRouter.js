import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Logout from '../components/Logout';
import TaskDetail from '../components/TaskDetail';
import AddTask from '../components/AddTask';

export const history = createBrowserHistory();

const AppRouter = ({ auth }) => {
  return (
    <Router history={history}>
      <div>
        {!_.isEmpty(auth.token) && <Header />}
        <div className="container">
          <Switch>
            <Route path="/" component={Login} exact={true} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/taskdetail" component={TaskDetail} />
            <Route path="/addtask" component={AddTask} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth //todo
});

export default connect(mapStateToProps)(AppRouter);