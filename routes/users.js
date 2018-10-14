const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


//Customer Model
const User = require('../models/User');

// ------ Register USER   --------
router.get('/', (req,res) =>{
    res.render('register');
});

router.post('/add', (req, res) =>{
    const {name, username, email, phone, password, address} = req.body;

    let user = new User({
        name,
        username,
        email,
        phone,
        password,
        address,
        status: '0'
    });

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err){
                console.log(err);
            }

            user.password = hash;
            user.save((err) => {
                if(err){
                    console.log(err);
                    return;
                } else{
                    res.redirect('/users/login');
                }
            });
        });
    });

});


// ------- Login Form -----------
router.get('/login', (req, res) =>{
    res.render('login');
});

// Login Process
router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/users/login'
    })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});


module.exports = router;