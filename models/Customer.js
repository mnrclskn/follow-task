const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: String,
    phone: String,
    mail: String,
    address: String,
    date_: { type: Date, default: Date.now }
});

module.exports = mongoose.model('customer', CustomerSchema);