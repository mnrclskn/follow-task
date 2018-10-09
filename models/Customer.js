const mongoose = require('Mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tel: String,
    mail: String,
    address: [{
        country: String,
        city: String,
        street: String
    }]
});

module.exports = mongoose.model('customer', CustomerSchema);