const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/connect');
const {
  isInvalidField
} = require('../utils/common');
const authMiddleware = require('../middleware/auth');
const Router = express.Router();
const _ = require('lodash');

//todo
Router.post('/addnewitem', authMiddleware, async (req, res) => {
  try {
    const { itemName, itemWeight, itemHeight, itemWidth, itemLength, itemImage, itemPrice, itemDescription, createdBy } = req.body;
    const validFieldsToUpdate = [
      'itemName', 
      'itemWeight', 
      'itemHeight', 
      'itemWidth', 
      'itemLength', 
      'itemImage', 
      'itemPrice', 
      'itemDescription',
      'createdBy'
    ];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        additem_error: 'Invalid field.'
      });
    }

    await pool.query(
      'insert into item(item_name, item_image, item_Length, item_width, item_height, item_weight, item_price, item_description, created_by, created_datetime) values($1,$2,$3,$4,$5,$6,$7,$8,$9,CURRENT_TIMESTAMP)',
      [itemName, itemImage, itemLength, itemWidth, itemHeight, itemWeight, itemPrice, itemDescription, createdBy]//todo
    );
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      additem_error: 'Error while adding item...Try again later.'
    });
  }
});

Router.get('/getallitems', authMiddleware, async (req, res) => {
    try {
  
      const allItems = await pool.query(
        'select * from item order by item_id'
      );

      res.send(allItems.rows);
    } catch (error) {
      res.status(400).send({
        getallitems_error: 'Error while retrieving all items...Try again later.'
      });
    }
});

//todo
Router.post('/updateitem', authMiddleware, async (req, res) => {
  try {
    const { itemId, itemName, itemWeight, itemHeight, itemWidth, itemLength, itemImage, itemPrice, itemDescription, updatedBy } = req.body;
    const validFieldsToUpdate = [
      'itemId', 
      'itemName', 
      'itemWeight', 
      'itemHeight', 
      'itemWidth', 
      'itemLength', 
      'itemImage', 
      'itemPrice', 
      'itemDescription',
      'updatedBy'
    ];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        updateitem_error: 'Invalid field.'
      });
    }

    await pool.query(
      'update item set item_name=$1, item_image=$2, item_Length=$3, item_width=$4, item_height=$5, item_weight=$6, item_price=$7, item_description=$8, updated_by=$9, updated_datetime=CURRENT_TIMESTAMP where item_id=$10',
      [itemName, itemImage, itemLength, itemWidth, itemHeight, itemWeight, itemPrice, itemDescription, updatedBy, itemId]//todo
    );
    // console.log(task_name);
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      updateitem_error: 'Error while updating item...Try again later.'
    });
  }
});

module.exports = Router;