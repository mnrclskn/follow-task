const express = require('express');
const router = express.Router();

//Models
const Customer = require('../models/Customer');

router.post('/', (req, res, next) =>{

    const customer = new Customer(req.body);

    const promise = customer.save();

    promise.then((data) =>{
        res.json(data);
    }).catch((err) =>{
        res.json(err);
    });
});

module.exports = router;