const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/followTask');
    mongoose.connection.on('open', () => {
        console.log('Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Failed');
    });

    mongoose.Promise = global.Promise;
};
