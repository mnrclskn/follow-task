const express = require('express');
const router = express.Router();

//Model
const Technician = require('../models/Technician');
const User = require('../models/User');

// ---- GET All Technician ---------
router.get('/', (req, res) => {
    const promise = Technician.find({});

    promise.then((data) => {
        res.render('technicians', {
            technicians: data
        }).catch((err) => {
            console.log(err);
        });
    })
});
//----------------------------------

// ---- ADD Technician -------------
router.get('/add', (req, res) =>{
    res.render('add-technician');
});

router.post('/add', (req, res) =>{
    const technician = new Technician(req.body);
    technician.save((err) =>{
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/technician');
        }
    });
});
//----------------------------------

// ----- DELETE Technician -----------
router.get('/delete/:id', (req, res) => {
    const promise = Technician.findByIdAndRemove(req.params.id);

    promise.then((data) =>{
        res.redirect('/technician');
    }).catch((err) => {
        console.log(err);
    });
});

// --------------------------------

// --- UPDATE - GET Edit Technician-------

router.get('/edit/:id', (req, res) => {
    const promise = Technician.findById(req.params.id);

    promise.then((data) =>{
        res.render('edit-technician', {
            technician: data
        }).catch((err) => {
            console.log(err);
        });
    })
});

router.post('/edit/:id', (req,res) =>{
    const promise = Technician.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        });

    promise.then((data) => {
        res.redirect('/technician');
    }).catch((err) => {
        console.log(err);
    });
});
//--------------------------------------

module.exports = router;