import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateFields } from '../utils/common';
// import { getAllUsers } from '../actions/auth';
import { updateItem} from '../actions/inventory';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';

//todo: image handling
function UpdateItem(props) {

  const [itemId, setItemId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemVendor, setItemVendor] = useState('');
  const [itemWeight, setItemWeight] = useState(0.00);
  const [itemHeight, setItemHeight] = useState(0.00);
  const [itemWidth, setItemWidth] = useState(0.00);
  const [itemLength, setItemLength] = useState(0.00);
  const [itemImage, setItemImage] = useState('todo url'); //todo
  const [itemPrice,setItemPrice] = useState(0.00);
  const [itemDescription,setItemDescription] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("selectedItem"));
    if (item) {
      setItemId(item.item_id);
      setItemName(item.item_name);
      setItemVendor(item.item_vendor);
      setItemWeight(item.item_weight);
      setItemHeight(item.item_height);
      setItemWidth(item.item_width);
      setItemLength(item.item_length);
      setItemImage(item.item_image);//todo
      setItemPrice(item.item_price);
      setItemDescription(item.item_description);
    }

    if (!_.isEmpty(props.auth)) {
        setUpdatedBy(props.auth.first_name + " " + props.auth.last_name);
    }

    return () => {
        props.dispatch(resetErrors());
    }
  }, []);

  useEffect(() => {
      setErrorMsg(props.errors);
  }, [props.errors]);

  const editItem = (event) => {
    event.preventDefault();
    const fieldsToValidate = [
        { itemName }
    ];

    const itemNameEntered = validateFields(fieldsToValidate);
    if (!itemNameEntered) {
        setErrorMsg({updateitem_error: 'Please enter item name.'});
    } else {
        setIsSubmitted(true);
        props.dispatch(updateItem({ itemId, itemName, itemVendor, itemWeight, itemHeight, itemWidth, itemLength, itemImage, itemPrice, itemDescription, updatedBy}))
        .then((response) => {
            if (response.success) {
                setSuccessMsg('Successfully updated a item!');
                setErrorMsg('');
            }
        });
    }
  }

  return (
      <div className="update-page">
      <br/><h1>Update Item</h1><br/>
      <div className="add-task-form">
          <Form onSubmit={editItem}>
          {errorMsg && (errorMsg.updateitem_error) ? (
              <p className="alert alert-danger" role="alert">
              {errorMsg.updateitem_error}
              </p>
          ) : (
              isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
              )
          )}
          <Form.Row>
          <Form.Group as={Col} controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
              type="text"
              name="itemName"
              placeholder="Item name"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="itemVendor">
              <Form.Label>Vendor</Form.Label>
              <Form.Control
              type="text"
              name="itemVendor"
              placeholder="Vendor"
              value={itemVendor}
              onChange={(event) => setItemVendor(event.target.value)}
              />
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="itemLength">
              <Form.Label>Length</Form.Label>
              <Form.Control
              type="number"
              step="0.01"
              name="itemLength"
              placeholder="Length(inch)"
              value={itemLength}
              onChange={(event) => setItemLength(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="itemWidth">
              <Form.Label>Width</Form.Label>
              <Form.Control
              type="number"
              step="0.01"
              name="itemWidth"
              placeholder="Width(inch)"
              value={itemWidth}
              onChange={(event) => setItemWidth(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="itemHeight">
              <Form.Label>Height</Form.Label>
              <Form.Control
              type="number"
              step="0.01"
              name="itemHeight"
              placeholder="Height(inch)"
              value={itemHeight}
              onChange={(event) => setItemHeight(event.target.value)}
              />
          </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="itemWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
              type="number"
              step="0.01"
              name="itemWeight"
              placeholder="weight(lb)"
              value={itemWeight}
              onChange={(event) => setItemWeight(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="itemPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
              type="number"
              step="0.01"
              name="itemPrice"
              placeholder="Price"
              value={itemPrice}
              onChange={(event) => setItemPrice(event.target.value)}
              />
          </Form.Group>
          </Form.Row>
          <Form.Group controlId="itemDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
              as="textarea"
              rows="6"
              name="itemDescription"
              placeholder="Description"
              value={itemDescription}
              onChange={(event) => setItemDescription(event.target.value)}
              />
          </Form.Group>
          <div className="action-items">
              <Link to="/itemsinfo" className="btn btn-warning">
              Items Info
              </Link>
              <Link to="/updateinstock" className="btn btn-success">
              Update Instock
              </Link>
              <Button variant="primary" type="submit">
              Update Item
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

export default connect(mapStateToProps)(UpdateItem);