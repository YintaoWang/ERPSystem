import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { validateFields } from '../utils/common';
// import { getAllUsers } from '../actions/auth';
import { addNewItem, uploadItemImage} from '../actions/inventory';
import _ from 'lodash';
import { resetErrors } from '../actions/errors';

//todo: image handling
function AddItem(props) {

//   const [itemId, setItemId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemVendor, setItemVendor] = useState('');
  const [itemWeight, setItemWeight] = useState(0.00);
  const [itemHeight, setItemHeight] = useState(0.00);
  const [itemWidth, setItemWidth] = useState(0.00);
  const [itemLength, setItemLength] = useState(0.00);
  const [itemImageUrl, setItemImageUrl] = useState(''); //todo
  const [itemImageFile, setItemImageFile] = useState('');
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
    //   setItemImageUrl(itemId + '.jpg');
    }
  };

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
        props.dispatch(addNewItem({ itemName, itemVendor, itemWeight, itemHeight, itemWidth, itemLength, itemImageUrl, itemPrice, itemDescription, createdBy}))
        .then((item) => {
            if (item) {
                if(itemImageFile != '') {
                    // upload item image
                    const data = new FormData();
                    data.append('image', itemImageFile);
                    data.append('new_file_name', item.item_id);
                    props.dispatch(uploadItemImage(data))
                    .then((response) => {
                        if (response.success) {
                            setSuccessMsg('Successfully insert a item!');
                            setErrorMsg('');
                        }
                    });
                } else {
                    setSuccessMsg('Successfully insert a item!');
                    setErrorMsg('');
                }
                // setTimeout(() => {history.push('/allitems')}, 3000);
                //dispatch to all tasks???
            }
        });
    }
  }

  return (
      <div className="add-page">
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
                src='http://localhost:5000/items/default.png'
                // src={BASE_IMAGE_URL + itemImageUrl}
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
          <Form.Row>
          <Form.Group as={Col} controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
              type="text"
              name="itemName"
              placeholder="Item name"
              onChange={(event) => setItemName(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="itemVendor">
              <Form.Label>Vendor</Form.Label>
              <Form.Control
              type="text"
              name="itemVendor"
              placeholder="Vendor"
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
              rows="4"
              name="itemDescription"
              placeholder="Description"
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
              Add Item
              </Button>
          </div>
          <br/><br/><br/><br/>
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