var express = require('express');
var router = express.Router();
const adminHandler = require('../models/admin/adminHandler');
const taskHandler = require('../models/task/taskHandler');
const userHandler = require('../models/user/userHandler');
const date = require('../lib/date');

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.session.authenticated && req.session.role == 'ADMIN'){ //ADMIN LOGIN
    let pendingUsers = await adminHandler.readPending(); //read all pending users
    let users = await adminHandler.readUsers(); //read all regular users
    res.render('admin', { pendingUsers: pendingUsers, users: users});
  } else if(req.session.authenticated && req.session.role == 'USER'){ //REGULAR USER LOGIN
    let userQuery = {email: req.session.user};
    let user = await userHandler.readUser(req, res, userQuery);
    let pendingQuery = {$and: 
      [{userID: user[0]._id}, 
      {status: false}]
    }; 
    let pendingTasks = await taskHandler.readTask(res, res, pendingQuery);
    let completedQuery = {$and: 
      [{userID: user[0]._id}, 
      {status: true}]
    }; 
    let completedTasks = await taskHandler.readTask(res, res, completedQuery);
    res.render('todo', { pendingTasks: pendingTasks, completedTasks: completedTasks });
  } else if(req.session.authenticated && req.session.role == 'PENDING'){
    res.render('pending', { title: 'Express' });
  } else {
    res.redirect('../users/login')
  }
});

router.get('/complete/:taskID', async function(req, res, next){
  let query = {_id: req.params.taskID}; 
  let updateQuery = {$set: 
    {status: true, completionDate: date.formatedDate()}}; 
  await taskHandler.updateTask(req, res, query, updateQuery);
  res.redirect('/todo');  
})


router.get('/delete/:taskID', async function(req, res, next){
  let query = {_id: req.params.taskID}; 
  await taskHandler.removeTask(req, res, query);
  res.redirect('/todo');  
})

router.post('/', async function(req, res, next){
  let user = await userHandler.readUser(req, res, {email: req.session.user});
  console.log(user[0]._id);
  await taskHandler.createTask(req, res, user[0]._id);
  res.redirect('/todo');
})
module.exports = router;
