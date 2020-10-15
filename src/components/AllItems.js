import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Table, Image} from 'react-bootstrap';
import { resetErrors } from '../actions/errors';
// import { toLocalDateTime } from '../utils/common';
import { getAllItems } from '../actions/inventory';
import { history } from '../router/AppRouter';
import { BASE_IMAGE_URL } from '../utils/constants';

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

  const handleSelectedItem = (item) => {
    // console.log("clicked");
    localStorage.setItem("selectedItem", JSON.stringify(item));
    history.push('/updateitem');
  };

  return (
    //todo: add serach conditions: item number
    //todo: export to CSV file?
    <Container>
        {errorMsg && errorMsg.getallitems_error && (
            <p className="alert alert-danger" role="alert">
            {errorMsg.getallitems_error}
            </p>
        )}
        <h2>All Items</h2>
        <div className="fixed-head-allitems">
        <table className=" table items-info-table table-striped table-bordered table-light" >
            <thead className="thead-dark">
                <tr>
                <th>ItemId</th>
                <th>Image</th>
                <th>Name</th>
                <th>InStock(CA)</th>
                <th>InStock(NY)</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Length</th>
                <th>Width</th>
                <th>Height</th>
                <th>Vendor</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {items.map((item) => (
                    <tr key={item.item_id} onClick={() => handleSelectedItem(item)}>
                    <td style={{textAlign:"center"}}>{item.item_id}</td>
                    <td style={{textAlign:"center"}}><Image src={BASE_IMAGE_URL + item.item_image} width='50px' /></td>
                    <td>{item.item_name}</td>
                    <td>{item.instock_qty_ca}</td>
                    <td>{item.instock_qty_ny}</td>
                    <td>{item.item_price}</td>
                    <td>{item.item_weight}</td>
                    <td>{item.item_length}</td>
                    <td>{item.item_width}</td>
                    <td>{item.item_height}</td>
                    <td>{item.item_vendor}</td>
                    <td>{item.item_description}</td>
                    </tr>
            ))}
            </tbody>
        </table>
        </div>
        {/* <br/><br/><br/><br/> */}
    </Container>     
  );
}

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps)(AllItems);