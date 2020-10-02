import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { validateFields } from '../utils/common';
import { updateInStock, getAllItems} from '../actions/inventory';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';

//todo:
function UpdateInStock(props) {

  const [allItems, setAllItems] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [inStockQtyCA, setInStockQtyCA] = useState(0);
  const [inStockQtyNY, setInStockQtyNY] = useState(0);
  const [newInStockQtyCA, setNewInStockQtyCA] = useState(0);
  const [newInStockQtyNY, setNewInStockQtyNY] = useState(0);
  const [plusQtyCA, setPlusQtyCA] = useState(0);
  const [minusQtyCA, setMinusQtyCA] = useState(0);
  const [plusQtyNY, setPlusQtyNY] = useState(0);
  const [minusQtyNY, setMinusQtyNY] = useState(0);
  const [updatedBy, setUpdatedBy] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  //used to get the latest instock info after updating.
  const [refreshData, setRefreshData] = useState(false); 

  useEffect(() => {
    if (!_.isEmpty(props.auth)) {
        setUpdatedBy(props.auth.first_name + " " + props.auth.last_name);
    }

    return () => {
        props.dispatch(resetErrors());
    }
  }, []);

  useEffect(() => {
    // console.log('refresh...');
    // console.log(refreshData);
    // console.log('refreshed...');
    props.dispatch(getAllItems())
    .then((items) => {
        if (items) {
            setAllItems([...items]);
            //test
            // console.log(items[0]);
            setItemId(items[0].item_id);
            setInStockQtyCA(items[0].instock_qty_ca);
            setNewInStockQtyCA(items[0].instock_qty_ca);
            setInStockQtyNY(items[0].instock_qty_ny);
            setNewInStockQtyNY(items[0].instock_qty_ny);
            
            //clear plus minus values
            setPlusQtyCA(0);
            setMinusQtyCA(0);
            setPlusQtyNY(0);
            setMinusQtyNY(0);
        }
    });
  }, [refreshData]);

  useEffect(() => {
      setErrorMsg(props.errors);
  }, [props.errors]);

  const handleSelectedItem = (event) => {
    setIsSubmitted(false);
    const selectedItem = event.target.value.split(':');
    setItemId(selectedItem[0]);
    setInStockQtyCA(selectedItem[1]);
    setNewInStockQtyCA(selectedItem[1]);
    setInStockQtyNY(selectedItem[2]);
    setNewInStockQtyNY(selectedItem[2]);

    //clear plus minus values
    setPlusQtyCA(0);
    setMinusQtyCA(0);
    setPlusQtyNY(0);
    setMinusQtyNY(0);
  };

  const handlePlusCA = (event) => {
    // console.log(event.target.value);
    setIsSubmitted(false);
    setPlusQtyCA(event.target.value);
    setNewInStockQtyCA(Number(inStockQtyCA) + Number(event.target.value) - Number(minusQtyCA));
  };

  const handleMinusCA = (event) => {
    setIsSubmitted(false);
    setMinusQtyCA(event.target.value);
    setNewInStockQtyCA(Number(inStockQtyCA) + Number(plusQtyCA) - Number(event.target.value));
  };

  const handlePlusNY = (event) => {
    setIsSubmitted(false);
    setPlusQtyNY(event.target.value);
    setNewInStockQtyNY(Number(inStockQtyNY) + Number(event.target.value) - Number(minusQtyNY));
  };

  const handleMinusNY = (event) => {
    setIsSubmitted(false);
    setMinusQtyNY(event.target.value);
    setNewInStockQtyNY(Number(inStockQtyNY) + Number(plusQtyNY) - Number(event.target.value));
  };

  const updateInStockQty = (event) => {
    event.preventDefault();
    // console.log("submit:", refreshData);
    // be careful!!!this must be called after updating, otherwise useeffect cannot get the latest instock info! 
    // setRefreshData(!refreshData); 
    setIsSubmitted(true);
    props.dispatch(updateInStock({ itemId, newInStockQtyCA, newInStockQtyNY, updatedBy}))
    .then((response) => {
        if (response.success) {
            setSuccessMsg('Successfully updated instock!');
            setErrorMsg('');
            // !!!be careful!!!this must be called after updating, otherwise useeffect cannot get the latest instock info! 
            setRefreshData(!refreshData);
            // console.log("submited:", refreshData);
        }
    });
  }

  return (
      <div className="update-page">
      <br/><h1>Update In Stock Quantity</h1><br/>
      <div className="add-task-form">
          <Form onSubmit={updateInStockQty}>
          {errorMsg && (errorMsg.updateinstock_error) ? (
              <p className="alert alert-danger" role="alert">
              {errorMsg.updateinstock_error}
              </p>
          ) : (
              isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
              )
          )}
          <Form.Group controlId="itemId"> 
              <Form.Label>Select a item</Form.Label>
              <Form.Control
              as="select"
              name="itemId"
              value={itemId+':'+inStockQtyCA+':'+inStockQtyNY}
              onChange={handleSelectedItem}
              >
              {allItems.map((item) => (
              <option key={item.item_id} value={item.item_id+':'+item.instock_qty_ca+':'+item.instock_qty_ny}>{item.item_id}: {item.item_name}</option>
              ))}
              </Form.Control>
          </Form.Group>
          <Form.Row>
          <Form.Group as={Col} controlId="inStockQtyCA">
              <Form.Label>CA</Form.Label>
              <Form.Control
              type="number"
              name="inStockQtyCA"
              value={inStockQtyCA}
              readOnly
              />            
          </Form.Group>
          <Form.Group as={Col} controlId="plusQtyCA">
              <Form.Label>Plus</Form.Label>
              <Form.Control
              type="number"
              name="plusQtyCA"
              min="0"
              value={plusQtyCA}
              onChange={handlePlusCA}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="minusQtyCA">
              <Form.Label>Minus</Form.Label>
              <Form.Control
              type="number"
              name="minusQtyCA"
              min="0"
              value={minusQtyCA}
              onChange={handleMinusCA}
            //   onChange={(event) => setMinusQtyCA(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="newInStockQtyCA">
              <Form.Label>CA(NewQty)</Form.Label>
              <Form.Control
              type="number"
              name="newInStockQtyCA"
              value={newInStockQtyCA}
              readOnly
              style={{color:"red"}}
              />
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="inStockQtyNY">
              <Form.Label>NY</Form.Label>
              <Form.Control
              type="number"
              name="inStockQtyNY"
              value={inStockQtyNY}
              readOnly
              />
          </Form.Group>
          <Form.Group as={Col} controlId="plusQtyNY">
              <Form.Label>Plus</Form.Label>
              <Form.Control
              type="number"
              name="plusQtyNY"
              min="0"
              value={plusQtyNY}
              onChange={handlePlusNY}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="minusQtyNY">
              <Form.Label>Minus</Form.Label>
              <Form.Control
              type="number"
              name="minusQtyNY"
              min="0"
              value={minusQtyNY}
              onChange={handleMinusNY}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="newInStockQtyNY">
              <Form.Label>NY(NewQty)</Form.Label>
              <Form.Control
              type="number"
              name="newInStockQtyNY"
              value={newInStockQtyNY}
              readOnly
              style={{color:"red"}}
              />
          </Form.Group>
          </Form.Row>
          <div className="action-items">
              <Link to="/itemsinfo" className="btn btn-warning">
              Items Info
              </Link>
              <Button variant="primary" type="submit">
              Update In Stock
              </Button>
          </div>
          </Form>
      </div>
      </div>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(UpdateInStock);