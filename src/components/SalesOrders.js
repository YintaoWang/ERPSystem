import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { resetErrors } from '../actions/errors';
import { getOrderLines, getOrderHeaders } from '../actions/salesOrders';
// import { history } from '../router/AppRouter';
import { toLocalDateTime } from '../utils/common';

function SalesOrders(props) {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [channel, setChannel] = useState('');
  const [orderId, setOrderId] = useState('');
  const [salesOrders, setSalesOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    return () => {props.dispatch(resetErrors())}; //ok
  }, []);

  useEffect(() => {
    setErrorMsg(props.errors);
  }, [props.errors]);

  const getSalesOrdersByCondition = (event) => {
    event.preventDefault(); //important!
    props.dispatch(getOrderHeaders({fromDate, toDate, channel, orderId}))
    .then((orders) => {
        console.log(orders);
        if(orders.length != 0) {
            let i=0;
            orders.forEach(header => {
                props.dispatch(getOrderLines(header.order_id))
                .then((lines) => {
                    if (lines) {
                        header.order_lines = lines;
                        // console.log(header);
                        // console.log(orders);
                        i++;
                        if(i == orders.length){
                            setSalesOrders([...orders]); //async, state changes but do not render, why???
                        }
                    }
                });
            });
        } else {
            setSalesOrders(orders);
        }
    });
  }

  return (
    //todo: add serach conditions: item number
    //todo: export to CSV file?
    <Container>
        {errorMsg && errorMsg.getorderheaders_error && (
            //todo: add getorderlines_error
            <p className="alert alert-danger" role="alert">
            {errorMsg.getorderheaders_error}
            </p>
        )}
        <h2>Sales Orders</h2>
        <Form onSubmit={getSalesOrdersByCondition}>
          <Form.Row>
          <Form.Group as={Col} controlId="fromDate">
              <Form.Label>From</Form.Label>
              <Form.Control
              type="date"
              name="fromDate"
              onChange={(event) => setFromDate(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="toDate">
              <Form.Label>To</Form.Label>
              <Form.Control
              type="date"
              name="toDate"
              placeholder="mm/dd/yyyy"
              onChange={(event) => setToDate(event.target.value)}
              />
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="channel">
              <Form.Label>Channel</Form.Label>
              <Form.Control
              as="select"
              name="channel"
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
              >
                <option value=''>All</option>
                <option value='Amazon'>Amazon</option>
                <option value='eBay'>eBay</option>
              </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="orderId">
              <Form.Label>Order Id</Form.Label>
              <Form.Control
              type="number"
              name="orderId"
              min="1"
              placeholder="Order Id"
              onChange={(event) => setOrderId(event.target.value)}
              />
          </Form.Group>
          </Form.Row>
          <div className="action-items">
              <Button variant="primary" type="submit">
              Search
              </Button>
          </div>
        </Form>   
        <div className="fixed-head-salesorders">
        <table className="table order-header-table table-striped table-bordered table-light">
            <thead className="thead-dark parent-head">
                <tr>
                <th>orderId</th>
                <th>channel</th>
                <th>subTotalAmt</th>
                <th>taxAmt</th>
                <th>taxRate</th>
                <th>discount</th>
                <th>shippingFee</th>
                <th>totalAmt</th>
                <th>shipState</th>
                <th>DateTime</th>
                <th>shipAddr</th>
                </tr>
            </thead>
            <tbody>
            {salesOrders.map((order) => (
                    <Fragment key={order.order_id}>
                    <tr data-toggle="collapse" data-target={"#id".concat(order.order_id)} className="accordion-toggle" key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.channel}</td>
                    <td>{order.subtotal_amt}</td>
                    <td>{order.tax_amt}</td>
                    <td>{order.tax_rate}%</td>
                    <td>{order.discount}</td>
                    <td>{order.shipping_fee}</td>
                    <td>{order.total_amt}</td>
                    <td>{order.ship_state}</td>
                    <td>{toLocalDateTime(order.order_datetime)}</td>
                    <td>{order.ship_addr}</td>
                    </tr>
                    <tr style={{pointerEvents:"none"}}>
                    <td colSpan="12" className="hiddenRow">
                        <div className="accordian-body collapse" id={"id".concat(order.order_id)}>
                            <Table className="order-line-table" striped bordered hover variant="dark" size="sm">
                                <thead>
                                    <tr>
                                    <th>lineId</th>
                                    <th>itemName</th>
                                    <th>itemId</th>
                                    <th>itemPrice</th>
                                    <th>itemQty</th>
                                    <th>taxAmt</th>
                                    <th>taxRate</th>
                                    <th>discount</th>
                                    <th>lineAmt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {order.order_lines.map((line) => (
                                    <tr key={line.line_id}>
                                    <td>{line.line_id}</td>
                                    <td>{line.item_name}</td>
                                    <td>{line.item_id}</td>
                                    <td>{line.item_price}</td>
                                    <td>{line.item_qty}</td>
                                    <td>{line.tax_amt}</td>
                                    <td>{line.tax_rate}%</td>
                                    <td>{line.discount}</td>
                                    <td>{line.line_amt}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </td>
                    </tr>
                    </Fragment>
            ))}
            </tbody>
        </table>
        </div>
    </Container>     
  );
}

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps)(SalesOrders);