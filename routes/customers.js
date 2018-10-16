const express = require('express');
const router = express.Router();

//Customer Model
const Customer = require('../models/Customer');

// ------ Add Customer   --------
router.get('/add',ensureAuthenticated, (req,res) =>{
    res.render('add_customer');
});

router.post('/add', (req, res) =>{
    const customer = new Customer(req.body);
    customer.save((err) =>{
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// ------------------------------

// ----- GET All Customers  ---------
router.get('/',ensureAuthenticated, (req, res, next) =>{
    Customer.find({}, (err, customers) =>{
        if(err){
            console.log(err);
        } else {
            res.render('customers', {
                title:'Customers',
                customers: customers
            });
        }
    });
});

//----------------------------------

// ----- DELETE Customer -----------
router.delete('/:_id', (req, res) => {
    const promise = Customer.findByIdAndRemove(req.params._id);

    promise.then((data) =>{
        res.redirect('/customers');
    }).catch((err) => {
        console.log(err);
    });
});

// --------------------------------

// --- UPDATE - GET Edit Customer-------

router.get('/edit/:id', (req, res) => {
    const promise = Customer.findById(req.params.id);

    promise.then((data) =>{
        res.render('edit-customer', {
            customer: data
        }).catch((err) => {
            console.log(err);
        });
    })
});

router.post('/edit/:id', (req,res) =>{
    const promise = Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        });

    promise.then((data) => {
        res.redirect('/customers');
    }).catch((err) => {
        console.log(err);
    });
});

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;