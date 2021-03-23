var express = require('express');
var router = express.Router();
const taskHandler = require('../models/task/taskHandler');
const userHandler = require('../models/user/userHandler');
const fs = require('fs').promises;
const xml2js = require("xml2js");

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
  if(format == 'json'){
    tasks = JSON.stringify(tasks); 
  }
  if(format == 'xml'){
/*     let builder = new xml2js.Builder();
    let xml; 
    for (let i = 0; i < tasks.length; i++) {
      xml += tasks[i];
      xml += ',';
    } */
    let builder = new xml2js.Builder();
    tasks = builder.buildObject(tasks);
    console.log(tasks);
  }
  
  await fs.writeFile(`${user[0].firstname}_${user[0].lastname}_todo.${format}`, tasks, function(err) {
    if (err) {
        console.log(err);
    }
  });

  res.download(`${user[0].firstname}_${user[0].lastname}_todo.${format}`);

});

module.exports = router;
