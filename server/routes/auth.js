const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/connect');
const {
  validateUser,
  isInvalidField,
  generateAuthToken
} = require('../utils/common');
const authMiddleware = require('../middleware/auth');

const Router = express.Router();

Router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    const validFieldsToUpdate = [
      'firstName',
      'lastName',
      'role',
      'email',
      'password'
    ];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        signup_error: 'Invalid field.'
      });
    }

    const result = await pool.query(
      'select count(*) as count from erp_user where email=$1',
      [email]
    );
    const count = result.rows[0].count;
    if (count > 0) {
      return res.status(400).send({
        signup_error: 'User with this email address already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query(
      'insert into erp_user(first_name, last_name, role_type, email, password, created_datetime) values($1,$2,$3,$4,$5,CURRENT_TIMESTAMP)',
      [firstName, lastName, role, email, hashedPassword]
    );
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      signup_error: 'Error while signing up..Try again later.'
    });
  }
});

Router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (!user) {
      res.status(400).send({
        sigin_error: 'Email/password does not match.'
      });
    }
    const token = await generateAuthToken(user);
    const result = await pool.query(
      'insert into tokens(access_token, user_id) values($1,$2) returning *',
      [token, user.user_id]
    );
    if (!result.rows[0]) {
      return res.status(400).send({
        signin_error: 'Error while signing in..Try again later.'
      });
    }
    user.token = result.rows[0].access_token; //soga
    res.send(user);
  } catch (error) {
    res.status(400).send({
      signin_error: 'Email/password does not match.'
    });
  }
});

Router.post('/updateprofile', async (req, res) => {
  try {
    const { firstName, lastName, role, userId } = req.body;
    const newProfile = await pool.query(
      'update erp_user set first_name=$1, last_name=$2, role_type=$3 where user_id=$4 returning *',
      [firstName, lastName, role, userId]
    );
    const user = newProfile.rows[0];
    const token = await generateAuthToken(user);
    const result = await pool.query(
      'update tokens set access_token=$1 where user_id=$2 returning *',
      [token, userId]
    );
    if (!result.rows[0]) {
      return res.status(400).send({
        updateprofile_error: 'Error while updating profile..Try again later.'
      });
    }
    user.token = token;
    delete user.password;
    res.send(user);
  } catch (error) {
    res.status(400).send({
      updateprofile_error: 'Error while updating profile..Try again later.'
    });
  }
});

Router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const { userid, access_token } = req.user;
    await pool.query('delete from tokens where user_id=$1 and access_token=$2', [
      userid,
      access_token
    ]);
    res.send();
  } catch (error) {
    res.status(400).send({
      logout_error: 'Error while logging out..Try again later.'
    });
  }
});

Router.get('/getallusers', authMiddleware, async (req, res) => {
    try {
    //   const value = Number(req.query.userid);
  
      const result = await pool.query(
        'select user_id, first_name, Last_name, email, password from erp_user'
      );
    //   console.log(result.rows[0]);
      res.send(result.rows); //201 meaning?
    } catch (error) {
      res.status(400).send({
        getallusers_error: 'Error while retrieving all users...Try again later.'
      });
    }
});

module.exports = Router;