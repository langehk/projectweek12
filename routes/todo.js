var express = require('express');
var router = express.Router();
const adminHandler = require('../models/admin/adminHandler');
const taskHandler = require('../models/task/taskHandler');
const userHandler = require('../models/user/userHandler');

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.session.authenticated && req.session.role == 'ADMIN'){
    let pendingUsers = await adminHandler.readPending();
    res.render('admin', { pendingUsers: pendingUsers });
  } else if(req.session.authenticated && req.session.role == 'USER'){
    let userQuery = {email: req.session.user};
    let user = await userHandler.readUser(req, res, userQuery);
    let pendingQuery = {$and: 
      [{userID: user[0]._id}, 
      {status: false}]
    }; 
    let pendingTasks = await taskHandler.readTask(res, res, pendingQuery);
    res.render('todo', { pendingTasks: pendingTasks });
  } else if(req.session.authenticated && req.session.role == 'PENDING'){
    res.render('pending', { title: 'Express' });
  } else {
    res.redirect('../users/login')
  }
});

router.get('/complete/:taskID', async function(req, res, next){
  let query = {_id: req.params.taskID}; 
  let updateQuery = {status: true}; 
  await taskHandler.updateTask(req, res, query, updateQuery);
  res.redirect('/todo');  
})

router.post('/', async function(req, res, next){
  
  let user = await userHandler.readUser(req, res, {email: req.session.user});
  console.log(user[0]._id);
  taskHandler.createTask(req, res, user[0]._id);
})
module.exports = router;
