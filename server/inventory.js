const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/connect');
const {
  isInvalidField
} = require('../utils/common');
const authMiddleware = require('../middleware/auth');
const Router = express.Router();
const _ = require('lodash');
const fs = require('fs');


Router.post('/uploaditemimage', async function(req, res) {
  try {
    //item image upload
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'server/images')
      },
      filename: function (req, file, cb) {
        cb(null, 'undefined.jpg' )
        // cb(null, Date.now() + '-' +file.originalname )
      }
    })

    const upload = multer({ storage: storage }).single('image');
    await upload(req, res, function (err) {
      fs.renameSync(req.file.path, req.file.path.replace('undefined', req.body.new_file_name));
      if (err instanceof multer.MulterError) {
          // return res.status(500).json(err)
          return res.status(500).send({
            updateitem_error: 'Error while uploading image... Try again later.'
          });
      } else if (err) {
          // return res.status(500).json(err)
          return res.status(500).send({
            updateitem_error: 'Error while uploading image... Try again later.'
          });
      }
      return res.status(200).send(req.file)
    })
  } catch (error) {
    return res.status(400).send({
      updateitem_error: 'Error while uploading image... Try again later.'
    });
  }
  
});

//todo
Router.post('/addnewitem', authMiddleware, async (req, res) => {
  try {
    const { itemName, itemVendor, itemWeight, itemHeight, itemWidth, itemLength, itemImageUrl, itemPrice, itemDescription, createdBy } = req.body;
    const validFieldsToUpdate = [
      'itemName', 
      'itemVendor', 
      'itemWeight', 
      'itemHeight', 
      'itemWidth', 
      'itemLength', 
      'itemImageUrl', 
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

    const result = await pool.query(
      'insert into item(item_name, item_vendor, instock_qty_ca, instock_qty_ny, item_image, item_Length, item_width, item_height, item_weight, item_price, item_description, created_by, created_datetime) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,CURRENT_TIMESTAMP) returning *',
      [itemName, itemVendor, 0, 0, itemImageUrl, itemLength, itemWidth, itemHeight, itemWeight, itemPrice, itemDescription, createdBy]//todo
    );
    
    const itemId = result.rows[0].item_id;
    // const itemImageUrl
    await pool.query(
      'update item set item_image=$1 where item_id=$2',
      [itemId + '.jpg', itemId]
    );

    // await pool.query(
    //     'insert into inventory(item_id, item_name, warehouse, instock_qty, updated_by, updated_datetime) values($1,$2,$3,$4,$5,$6,CURRENT_TIMESTAMP)',
    //     [result.rows[0].item_id, itemName, itemName, 'CA', 0, createdBy]//todo
    // );
    res.send(result.rows[0]);
  } catch (error) {
    res.status(400).send({
      additem_error: 'Error while adding item...Try again later.'
    });
  }
});

//todo
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

Router.get('/getitembyid', authMiddleware, async (req, res) => {
  try {
    const itemId = req.query.item_id;
    const item = await pool.query(
      'select * from item where item_id=$1',
      [itemId]
    );

    res.send(item.rows[0]);
  } catch (error) {
    res.status(400).send({
      updateitem_error: 'Error while retrieving item...Try again later.'
    });
  }
});

//todo
Router.post('/updateitem', authMiddleware, async (req, res) => {
  try {
    const { itemId, itemName, itemVendor, itemWeight, itemHeight, itemWidth, itemLength, itemImageUrl, itemPrice, itemDescription, updatedBy } = req.body;
    const validFieldsToUpdate = [
      'itemId', 
      'itemName', 
      'itemVendor', 
      'itemWeight', 
      'itemHeight', 
      'itemWidth', 
      'itemLength', 
      'itemImageUrl', 
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
      'update item set item_name=$1, item_image=$2, item_Length=$3, item_width=$4, item_height=$5, item_weight=$6, item_price=$7, item_description=$8, updated_by=$9, updated_datetime=CURRENT_TIMESTAMP, item_vendor=$10 where item_id=$11',
      [itemName, itemImageUrl, itemLength, itemWidth, itemHeight, itemWeight, itemPrice, itemDescription, updatedBy, itemVendor, itemId]//todo
    );


    //item image upload
    // const storage = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     cb(null, 'server/images')
    //   },
    //   filename: function (req, file, cb) {
    //     cb(null, file.originalname )
    //     // cb(null, Date.now() + '-' +file.originalname )
    //   }
    // })

    // const upload = multer({ storage: storage }).single('file');
    // await upload(req, res, function (err) {
    //       if (err instanceof multer.MulterError) {
    //           return res.status(500).json(err)
    //       } else if (err) {
    //           return res.status(500).json(err)
    //       }
    //   return res.status(200).send(req.file)
    // })

    // console.log(task_name);
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      updateitem_error: 'Error while updating item...Try again later.'
    });
  }
});

Router.post('/updateinstock', authMiddleware, async (req, res) => {
  try {
    const { itemId, newInStockQtyCA, newInStockQtyNY, updatedBy } = req.body;
    const validFieldsToUpdate = [
      'itemId', 
      'newInStockQtyCA',
      'newInStockQtyNY',
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
      'update item set instock_qty_ca=$1, instock_qty_ny=$2, updated_by=$3, updated_datetime=CURRENT_TIMESTAMP where item_id=$4',
      [newInStockQtyCA, newInStockQtyNY, updatedBy, itemId]
    );

    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      updateitem_error: 'Error while updating item...Try again later.'
    });
  }
});

module.exports = Router;