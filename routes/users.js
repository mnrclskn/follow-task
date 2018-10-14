const express = require('express');
const router = express.Router();

//Customer Model
const User = require('../models/User');

// ------ Register USER   --------
router.get('/', (req,res) =>{
    res.render('register');
});

router.post('/add', (req, res) =>{
    const user = new User(req.body);
    user.save((err) =>{
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// ------------------------------

module.exports = router;