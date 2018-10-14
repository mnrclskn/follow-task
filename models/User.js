const mongoose = require('mongoose');

/*
    Users Scheme
    Status = 0 => Customers
    Status = 1 => Technician
*/

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true,
    },
    createDate:{
        type:Date,
        default: Date.now
    }
});

const User = module.exports = mongoose.model('User', UserSchema);