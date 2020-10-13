const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth');
// const profileRoute = require('./routes/profile'); //todo: delete
const tasksRoute = require('./routes/tasks');
const inventoryRoute = require('./routes/inventory');
const salesOrdersRoute = require('./routes/salesOrders');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(authRoute);
// app.use(profileRoute); //todo: delete
app.use(tasksRoute);
app.use(inventoryRoute);
app.use(salesOrdersRoute);
//image test
// app.use(express.static(__dirname + '/images'));

app.use(express.static('public'));
//Serves all the request which includes /items in the url from images folder
app.use('/items', express.static(__dirname + '/images'));

// app.use('/images', express.static(__dirname, '/images'));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});