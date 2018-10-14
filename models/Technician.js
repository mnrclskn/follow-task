const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechnicianSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});

module.exports= mongoose.model('technician', TechnicianSchema);