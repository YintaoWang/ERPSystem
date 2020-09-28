const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const authMiddleware = async function (req, res, next) {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    const result = await pool.query( //check if authentication token is valid?
      'select e.userid,e.first_name,e.last_name,e.role_type,e.email,t.access_token from erp_user e inner join tokens t on e.userid=t.userid where t.access_token=$1 and t.userid=$2',
      [token, decoded.userid]
    );
    const user = result.rows[0];
    if (user) {
      req.user = user;
      req.token = token; //already have access_token in user, why need this?
      next();
    } else {
      throw new Error('Error while authentication');
    }
  } catch (error) {
    res.status(400).send({
      auth_error: 'Authentication failed.'
    });
  }
};

module.exports = authMiddleware;