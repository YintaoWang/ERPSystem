import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Dashboard from '../components/Dashboard';
// import NavigationBar from '../components/NavigationBar';
import Logout from '../components/Logout';
// import TaskDetail from '../components/TaskDetail';
import AddTask from '../components/AddTask';
import AllTasks from '../components/AllTasks';
import UpdateTask from '../components/UpdateTask';
import AddItem from '../components/AddItem';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
// import { Container, Row, Col, Button, Collapse} from 'react-bootstrap';
import AllItems from '../components/AllItems';
import UpdateItem from '../components/UpdateItem';
import UpdateInStock from '../components/UpdateInStock';
import SalesOrders from '../components/SalesOrders';
import UpdateProfile from '../components/UpdateProfile';
// import OrderInfo from '../components/OrderInfo';
// import '../css/main.scss';

export const history = createBrowserHistory();

const AppRouter = ({ auth }) => {
    // const [open, setOpen] = useState(false);

  return (
    <Router history={history}>
      <div>  
        {!_.isEmpty(auth.token) && <div><Sidebar/></div>}
        <div className="content">
          <Switch>
            <Route path="/" component={Login} exact={true} />
            <Route path="/signup" component={Signup} />
            <Route path="/logout" component={Logout} />
            <Route path="/updateprofile" component={UpdateProfile} />
            <Route path="/dashboard" component={Dashboard} />
            {/* //to do: delete taskdetail*/}
            {/* <Route path="/taskdetail" component={TaskDetail} />  */}
            {/* Task Management */}
            <Route path="/addtask" component={AddTask} />
            <Route path="/alltasks" component={AllTasks} />
            <Route path="/updatetask" component={UpdateTask} />
            {/* Inventory Management */}
            <Route path="/additem" component={AddItem} />
            <Route path="/allitems" component={AllItems} />
            <Route path="/updateitem" component={UpdateItem} />
            <Route path="/updateinstock" component={UpdateInStock} />
            {/* Sales Order Management */}
            <Route path="/salesorders" component={SalesOrders} />
            {/* <Route path="/orderinfo" component={OrderInfo} /> */}
          </Switch>
        </div>
        {!_.isEmpty(auth.token) && <div><Footer/></div>}
    </div>
    </Router>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth //todo
});

export default connect(mapStateToProps)(AppRouter);