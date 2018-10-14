const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    Users Scheme
    Status = 0 => Customers
    Status = 1 => Technician
*/

const UserSchema = new Schema({
    name:String,
    username:String,
    email:String,
    phone:String,
    password:String,
    address: String,
    status:String,
    createDate:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);