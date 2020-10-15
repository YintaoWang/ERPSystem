const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const isInvalidField = (receivedFields, validFieldsToUpdate) => {
  return receivedFields.some(
    (field) => validFieldsToUpdate.indexOf(field) === -1
  );
};

const validateUser = async (email, password) => {
  const result = await pool.query(
    // 'select user_id, first_name, Last_name, email, password from erp_user where email = $1',
    'select * from erp_user where email = $1',
    [email]
  );
  const user = result.rows[0];
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      delete user.password;
      return user;
    } else {
      throw new Error(); //TODO password doesn't match
    }
  } else {
    throw new Error(); //todo no such user exists.
  }
};

const generateAuthToken = async (user) => {
  const { user_id, email, first_name, last_name, role_type} = user; //todo, need first_name, last_name
  const secret = process.env.secret;
  const token = await jwt.sign({ user_id, email, first_name, last_name, role_type }, secret); 
  return token;
};

module.exports = {
  isInvalidField,
  validateUser,
  generateAuthToken
};