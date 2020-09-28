import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Table, Row, Col, Card, ProgressBar} from 'react-bootstrap';
import { getTasksByUser } from '../actions/tasks';
import { resetErrors } from '../actions/errors';
import { toLocalDateTime } from '../utils/common';
import { getAllItems } from '../actions/inventory';
import { history } from '../router/AppRouter';

// class Dashboard extends React.Component {
function AllItems(props) {

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {

    props.dispatch(getAllItems())
    .then((allItems) => {
        if(allItems) {
            setItems([...allItems]);
        }
    });

    setErrorMsg(props.errors);
    return () => {props.dispatch(resetErrors())}; //ok
  }, []);

  const handleDetail = (item) => {
    // console.log("clicked");
    localStorage.setItem("selectedItem", JSON.stringify(item));
    history.push('/updateitem');
  };

  return (
    <Container className="dashboard-container">
        {errorMsg && errorMsg.getallitems_error && (
            <p className="alert alert-danger" role="alert">
            {errorMsg.getallitems_error}
            </p>
        )}
        <h2>All the Items</h2>
        <Table responsive striped bordered hover variant="warning" size="sm">
            <thead>
                <tr>
                <th>ItemId</th>
                <th>Name</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Length</th>
                <th>Width</th>
                <th>Height</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                    <tr key={item.item_id} onClick={() => handleDetail(item)}>
                    <td>{item.item_id}</td>
                    <td>{item.item_name}</td>
                    <td>{item.item_price}</td>
                    <td>{item.item_weight}</td>
                    <td>{item.item_length}</td>
                    <td>{item.item_width}</td>
                    <td>{item.item_height}</td>
                    <td>{item.item_description}</td>
                    </tr>
            ))}
            </tbody>
        </Table>
    </Container>     
  );
}

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps)(AllItems);