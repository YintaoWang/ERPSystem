const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/connect');
const {
  isInvalidField
} = require('../utils/common');
const authMiddleware = require('../middleware/auth');
const Router = express.Router();
const _ = require('lodash');
const { values } = require('lodash');

Router.get('/getorderheaders', authMiddleware, async (req, res) => {
    try {
      const from_date = req.query.from_date;
      const to_date = req.query.to_date;
      const channel = req.query.channel;
      const order_id = req.query.order_id;
    //   result = null;
      var textSql = 'select * from sales_order_header where 1=1 ';

    //   textSql.toString().concat("test", "test");
    //   var test = "select * from sales_order_header where 1=1";
    //   textSql.concat()
    //   values = [from_date, to_date, channel, order_id];
      if (!_.isEmpty(from_date)) {textSql = textSql.concat(' and order_datetime>=\'', from_date, '\'')}
      if (!_.isEmpty(to_date)) {textSql = textSql.concat(' and order_datetime<=\'', to_date, '\'')}
      if (!_.isEmpty(channel)) {textSql = textSql.concat(' and channel=\'', channel, '\'')}
      if (!_.isEmpty(order_id)) {textSql = textSql.concat(' and order_id=', order_id)}
      texSql = textSql.concat(' order by order_datetime');
      const result = await pool.query(
          textSql
        //   [from_date, to_date, channel, order_id]
        //   []
        //   'select * from sales_order_header where order_datetime>=$1 and order_datetime<=$2 and channel=$3 order by order_datetime',
        //   [from_date, to_date, channel]
      );
      res.send(result.rows); //201 meaning?
    } catch (error) {
      res.status(400).send({
          getorderheaders_error: 'Error while retrieving sales orders...Try again later.'
      });
    }
});

Router.get('/getorderlines', authMiddleware, async (req, res) => {
    try {
      const orderId = req.query.order_id;
      result = await pool.query(
          'select * from sales_order_line where order_id=$1',
          [orderId]
      );
      res.send(result.rows); //201 meaning?
    } catch (error) {
      res.status(400).send({
        getorderlines_error: 'Error while retrieving sales order detail...Try again later.'
      });
    }
});

module.exports = Router;