const { connect } = require('mongoose');
require('dotenv').config();
const Customer = require('./models/customer.js');

// Connect to database
let dbConnection;

// Add customer
const addCustomer = (customer, debug = false) => {
  connect(process.env.MONGO_URI)
    .then((connection) => {
      dbConnection = connection;
      debug && console.log('Connected to database!');
      return Customer.create(customer);
    })
    .then((customer) => {
      console.info('New customer added:');
      delete customer._doc.__v;
      console.info(customer);
      return dbConnection.disconnect();
    })
    .then(() => {
      debug && console.info('Closed database connection');
    })
    .catch(console.error);
};

// Find customers (case insensitive)
const findCustomersByName = (name, debug = false) => {
  const search = new RegExp(name, 'i');
  connect(process.env.MONGO_URI)
    .then((connection) => {
      dbConnection = connection;
      debug && console.log('Connected to database!');
      return Customer.find({
        $or: [
          { firstname: { $regex: search } },
          { lastname: { $regex: search } },
        ],
      });
    })
    .then((customers) => {
      console.info(
        `${customers.length} matches${customers.length > 0 ? ':' : ''}`
      );
      if (customers.length > 0) {
        console.info(
          customers.map(({ _id, firstname, lastname, email, phone }) => ({
            _id: _id.toString(),
            firstname,
            lastname,
            email,
            phone,
          }))
        );
      }
      return dbConnection.disconnect();
    })
    .then(() => {
      debug && console.info('Closed database connection');
    })
    .catch(console.error);
};

// Update customer information
const updateCustomer = (_id, update, debug = false) => {
  connect(process.env.MONGO_URI)
    .then((connection) => {
      dbConnection = connection;
      debug && console.log('Connected to database!');
      return Customer.findByIdAndUpdate(_id, update, { new: true });
    })
    .then((updatedCustomer) => {
      console.info('Customer information updated:');
      delete updatedCustomer._doc.__v;
      console.info(updatedCustomer);
      return dbConnection.disconnect();
    })
    .then(() => {
      debug && console.info('Closed database connection');
    })
    .catch(console.error);
};

// Remove a customer
const removeCustomer = (_id, debug = false) => {
  connect(process.env.MONGO_URI)
    .then((connection) => {
      dbConnection = connection;
      debug && console.log('Connected to database!');
      return Customer.findByIdAndDelete(_id);
    })
    .then((removedCustomer) => {
      console.info('Customer removed:');
      delete removedCustomer._doc.__v;
      console.info(removedCustomer);
      return dbConnection.disconnect();
    })
    .then(() => {
      debug && console.info('Closed database connection');
    })
    .catch(console.error);
};

// List all customers
const listAllCustomers = (debug = false) => {
  connect(process.env.MONGO_URI)
    .then((connection) => {
      dbConnection = connection;
      debug && console.log('Connected to database!');
      return Customer.find();
    })
    .then((allCustomers) => {
      console.info(
        `${allCustomers.length} matches${allCustomers.length > 0 ? ':' : ''}`
      );
      if (allCustomers.length > 0) {
        console.info(
          allCustomers.map(({ _id, firstname, lastname, email, phone }) => ({
            _id: _id.toString(),
            firstname,
            lastname,
            email,
            phone,
          }))
        );
      }
      return dbConnection.disconnect();
    })
    .then(() => {
      debug && console.info('Closed database connection');
    })
    .catch(console.error);
};

module.exports = {
  addCustomer,
  findCustomersByName,
  updateCustomer,
  removeCustomer,
  listAllCustomers,
};
