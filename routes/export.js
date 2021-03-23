var express = require('express');
var router = express.Router();
const taskHandler = require('../models/task/taskHandler');
const userHandler = require('../models/user/userHandler');
const fs = require('fs').promises;

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

router.post('/', async function(req, res, next) {
  let userEmail = req.body.chosenuser; 
  let format = req.body.format; 
  let user = await userHandler.readUser({email: userEmail}); 
  let tasks = await taskHandler.readTask({userID: user[0]._id}); 
  tasks = JSON.stringify(tasks); 
  await fs.writeFile(`${user[0].firstname}_${user[0].lastname}_todo.json`, tasks, function(err) {
    if (err) {
        console.log(err);
    }
  });
  
  

  //console.log(tasks);
  res.send('export');
});

module.exports = router;
