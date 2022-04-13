const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  phone: { type: String },
  email: { type: String },
});

module.exports = model('Customer', customerSchema);
