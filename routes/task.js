const express = require('express');
const router = express.Router();

//Model
const Task = require('../models/Task');
const User = require('../models/User');
const Technician = require('../models/Technician');

// GET All Tasks
router.get('/',ensureAuthenticated, (req, res) => {
    const promise = Task.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $lookup: {
                from: 'technicians',
                localField: 'technician_id',
                foreignField: '_id',
                as: 'technician'
            }
        },
        {
            $unwind: '$technician'
        }
    ]);

    promise.then((data) => {
        Technician.find({}, (err, technicians) =>{
            if(err){
                console.log(err);
            } else {
                res.render('tasks', {
                    tasks: data,
                    technicians
                });
            }
        });
    }).catch((err) => {
        res.json(err);
    });
});

// GET Add Task Form
router.get('/add',ensureAuthenticated, (req,res) =>{
  const promise = User.findById(req.user._id);

  promise.then((data) =>{
      res.render('add-task', {
        users: data
      });
  }).catch((err) =>{
    console.log(err);
  });
});

//POST Add Task
router.post('/add',ensureAuthenticated, (req,res) =>{
  const description = req.body.description;

  const task = new Task({
      user_id: req.user._id,
      description,
      status: '0'
  });

  task.save((err) => {
      if(err){
          console.log(err);
          return;
      } else{
          res.redirect('/task');
      }
  });
});

// UPDATE -  Choose Technician
router.get('/edit/:technician_id/:task_id', (req,res) =>{
    let query = {_id:req.params.task_id}

    let task = {};
    task.technician_id = req.params.technician_id;

    Task.update(query, task, (err) =>{
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/task');
        }
    });
});

// UPDATE -  Change State
router.get('/state/:state/:task_id', (req,res) =>{
    let query = {_id:req.params.task_id}

    let task = {};
    task.status = req.params.state;

    Task.update(query, task, (err) =>{
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/task');
        }
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
