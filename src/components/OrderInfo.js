import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { resetErrors } from '../actions/errors';
import { getOrderLines, getSalesOrders } from '../actions/salesOrders';
import { history } from '../router/AppRouter';
import { toLocalDateTime } from '../utils/common';

function OrderInfo(props) {

//   const [fromDate, setFromDate] = useState(Date());
//   const [toDate, setToDate] = useState(Date());
//   const [channel, setChannel] = useState('');
//   const [salesOrders, setSalesOrders] = useState([]);
  const [orderHeader, setOrderHeader] = useState('');
  const [orderLines, setOrderLines] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("selectedOrder"));
    if (order) {
        setOrderHeader(order);
        props.dispatch(getOrderLines(order.order_id))
        .then((lines) => {
            if (lines) {
                setOrderLines([...lines]);
            }
        });
    }
    return () => {props.dispatch(resetErrors())}; //ok
  }, []);

  useEffect(() => {
    setErrorMsg(props.errors);
  }, [props.errors]);

//   const getSalesOrdersByCondition = (event) => {
//     event.preventDefault(); //important!
//     props.dispatch(getSalesOrders({fromDate, toDate, channel}))
//     .then((orders) => {
//         console.log(orders);
//         if(orders) {
//             setSalesOrders([...orders]);
//         }
//     });
//   }

//   const handleSelectedOrder = (order) => {
//     localStorage.setItem("selectedOrder", JSON.stringify(order));
//     history.push('/orderinfo');//todo
//   };

  return (
    //todo: add serach conditions: item number
    <Container>
        {errorMsg && errorMsg.getorderlines_error && (
            <p className="alert alert-danger" role="alert">
            {errorMsg.getorderlines_error}
            </p>
        )}
        <h2>Order Detail</h2>
        <h3>Order Header</h3> 
        <Table className="order-header-table" responsive striped bordered hover variant="light" size="sm">
            <thead>
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
                <th>shipAddr</th>
                <th>DateTime</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td style={{textAlign:"center"}}>{orderHeader.order_id}</td>
                <td>{orderHeader.channel}</td>
                <td>{orderHeader.subtotal_amt}</td>
                <td>{orderHeader.tax_amt}</td>
                <td>{orderHeader.tax_rate}%</td>
                <td>{orderHeader.discount}</td>
                <td>{orderHeader.shipping_fee}</td>
                <td>{orderHeader.total_amt}</td>
                <td>{orderHeader.ship_state}</td>
                <td>{orderHeader.ship_addr}</td>
                <td>{toLocalDateTime(orderHeader.order_datetime)}</td>
                </tr>
            </tbody>
        </Table>
        <h3>Order Lines</h3> 
        <Table className="order-line-table" responsive striped bordered hover variant="light" size="sm">
            <thead>
                <tr>
                <th>lineId</th>
                <th>itemId</th>
                <th>itemName</th>
                <th>itemPrice</th>
                <th>itemQty</th>
                <th>taxAmt</th>
                <th>taxRate</th>
                <th>discount</th>
                <th>lineAmt</th>
                </tr>
            </thead>
            <tbody>
                {orderLines.map((line) => (
                    <tr key={line.line_id}>
                    <td style={{textAlign:"center"}}>{line.line_id}</td>
                    <td>{line.item_id}</td>
                    <td>{line.item_name}</td>
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
    </Container>     
  );
}

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps)(OrderInfo);