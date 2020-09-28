import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap';
import { validateFields } from '../utils/common';
// import { getAllUsers } from '../actions/auth';
import { addNewItem} from '../actions/inventory';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';
import { history } from '../router/AppRouter';

//todo: image handling
function AddItem(props) {

  const [itemName, setItemName] = useState('');
  const [itemWeight, setItemWeight] = useState(0.00);
  const [itemHeight, setItemHeight] = useState(0.00);
  const [itemWidth, setItemWidth] = useState(0.00);
  const [itemLength, setItemLength] = useState(0.00);
  const [itemImage, setItemImage] = useState('todo url'); //todo
  const [itemPrice,setItemPrice] = useState(0.00);
  const [itemDescription,setItemDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(props.auth)) {
        setCreatedBy(props.auth.first_name + " " + props.auth.last_name);
    }

    return () => {
        props.dispatch(resetErrors());
    }
  }, []);

  useEffect(() => {
      setErrorMsg(props.errors);
  }, [props.errors]);

  const addItem = (event) => {
    event.preventDefault();
    const fieldsToValidate = [
        { itemName }
    ];

    const itemNameEntered = validateFields(fieldsToValidate);
    if (!itemNameEntered) {
        setErrorMsg({additem_error: 'Please enter item name.'});
    } else {
        setIsSubmitted(true);
        props.dispatch(addNewItem({ itemName, itemWeight, itemHeight, itemWidth, itemLength, itemImage, itemPrice, itemDescription, createdBy}))
        .then((response) => {
            if (response.success) {
                setSuccessMsg('Successfully add a item! now redirect to item list page');
                setErrorMsg('');
                setTimeout(() => {history.push('/allitems')}, 3000);
                //dispatch to all tasks???
            }
        });
    }
  }

  return (
      <div className="login-page">
      <br/><h1>Add a Item</h1><br/>
      <div className="add-task-form">
          <Form onSubmit={addItem}>
          {errorMsg && errorMsg.additem_error ? (
              <p className="alert alert-danger" role="alert">
              {errorMsg.additem_error}
              </p>
          ) : (
              isSubmitted && (
              <p className="successMsg centered-message">{successMsg}</p>
              )
          )}
          <Form.Group controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
              type="text"
              name="itemName"
              placeholder="Item name"
              onChange={(event) => setItemName(event.target.value)}
              />
          </Form.Group>
          <Form.Row>
          <Form.Group as={Col} controlId="itemLength">
              <Form.Label>Length</Form.Label>
              <Form.Control
              type="number"
              step="0.01"
              name="itemLength"
              placeholder="Length(inch)"
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
              onChange={(event) => setItemDescription(event.target.value)}
              />
          </Form.Group>
          <div className="action-items">
              <Button variant="primary" type="submit">
              Add Item
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

export default connect(mapStateToProps)(AddItem);