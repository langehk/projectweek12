var express = require('express');
var router = express.Router();
const taskHandler = require('../models/task/taskHandler');
const userHandler = require('../models/user/userHandler');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
  let userEmail = req.body.chosenuser; 
  let format = req.body.format; 
  let user = await userHandler.readUser({email: userEmail}); 
  let tasks = await taskHandler.readTask({userID: user[0]._id}); 
  //console.log(user);
  console.log(tasks);
  res.send('export');
});

module.exports = router;
