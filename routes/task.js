const express = require('express');
const router = express.Router();

//Model
const Task = require('../models/Task');
const User = require('../models/User');

// GET All Tasks
router.get('/', (req, res) => {
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
        }
    ]);

    promise.then((data) => {
        res.render('tasks', {
            tasks: data
        });
    }).catch((err) => {
        res.json(err);
    })
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
router.post('/add', (req,res) =>{
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

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = router;
