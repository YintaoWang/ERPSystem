import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateFields } from '../utils/common';
// import { getAllUsers } from '../actions/auth';
import { updateItem, uploadItemImage, getItemById} from '../actions/inventory';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';
import { BASE_IMAGE_URL } from '../utils/constants';

//todo: image handling
function UpdateItem(props) {

  const [itemId, setItemId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemVendor, setItemVendor] = useState('');
  const [itemWeight, setItemWeight] = useState(0.00);
  const [itemHeight, setItemHeight] = useState(0.00);
  const [itemWidth, setItemWidth] = useState(0.00);
  const [itemLength, setItemLength] = useState(0.00);
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemImageFile, setItemImageFile] =  useState('');
  const [itemPrice,setItemPrice] = useState(0.00);
  const [itemDescription,setItemDescription] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const selectedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (selectedItem) {
        props.dispatch(getItemById(selectedItem.item_id))
        .then((item) => {
            setItemId(item.item_id);
            setItemName(item.item_name);
            setItemVendor(item.item_vendor);
            setItemWeight(item.item_weight);
            setItemHeight(item.item_height);
            setItemWidth(item.item_width);
            setItemLength(item.item_length);
            setItemImageUrl(item.item_image);
            setItemPrice(item.item_price);
            setItemDescription(item.item_description);
        });
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

  useEffect(() => {
    setIsSubmitted(false);
  }, [itemImageFile, itemName, itemVendor, itemLength, itemWidth, itemHeight, itemWidth, itemPrice, itemDescription]);

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const handleImageUpload = (event) => {
    const [file] = event.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = event => {
        current.src = event.target.result;
      };
      reader.readAsDataURL(file);
      setItemImageFile(event.target.files[0]);
      setItemImageUrl(itemId + '.jpg');
    }
  };

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
        props.dispatch(updateItem({ itemId, itemName, itemVendor, itemWeight, itemHeight, itemWidth, itemLength, itemImageUrl, itemPrice, itemDescription, updatedBy}))
        .then((response) => {
            if (response.success) {
                if(itemImageFile != '') {
                    // upload item image
                    const data = new FormData();
                    data.append('image', itemImageFile);
                    data.append('new_file_name', itemId);
                    props.dispatch(uploadItemImage(data))
                    .then((response) => {
                        if (response.success) {
                            setSuccessMsg('Successfully updated item!');
                            setErrorMsg('');
                        }
                    });
                } else {
                    setSuccessMsg('Successfully updated item!');
                    setErrorMsg('');
                }
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
          
          <div
            // style={{
            //     display: "flex",
            //     flexDirection: "column",
            //     alignItems: "center",
            //     justifyContent: "center"
            // }}
            >
            Item Image (Click to upload image)
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                display: "none"
                }}
            />
            <div
                // style={{
                // height: "60px",
                // width: "60px",
                // border: "1px dashed black"
                // }}
                onClick={() => imageUploader.current.click()}
            >
                <Image
                ref={uploadedImage}
                // src='http://localhost:5000/items/cat.jpg'
                src={BASE_IMAGE_URL + itemImageUrl}
                rounded 
                thumbnail 
                width="200px"
                // style={{
                //     width: "100%",
                //     height: "100%",
                //     position: "absolute"
                // }}

                />
            </div>
            
            </div>
          {/* <div>Item Image (click to reset)</div> */}
          {/* <Image src="http://localhost:5000/items/cat.jpg" rounded thumbnail width="200px"/> */}
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
          {/* <Col xs={6} md={4}>
            <Image src="http://localhost:5000/items/cat.jpg" rounded thumbnail width="200px"/>
          </Col> */}
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
              rows="4"
              name="itemDescription"
              placeholder="Description"
              value={itemDescription}
              onChange={(event) => setItemDescription(event.target.value)}
              />
          </Form.Group>
          <div className="action-items">
              <Link to="/allitems" className="btn btn-warning">
              All Items
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
      <br/><br/><br/><br/>
      </div>
  );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(UpdateItem);