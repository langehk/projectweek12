var express = require('express');
var router = express.Router();
const taskHandler = require('../models/task/taskHandler');
const userHandler = require('../models/user/userHandler');
const fs = require('fs').promises;
var EasyXml = require('easyxml');

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
  if(format == 'xml'){
    tasks = JSON.parse(tasks); //needs to get JSON stringified to stringify ID, and then converted back to objects
    var serializer = new EasyXml({
        singularize: true,
        rootElement: 'todo',
        dateFormat: 'ISO',
        manifest: false,
        unwrapArrays: false
    });

    let xml = `<?xml version='1.0' encoding='utf-8'?>`; //manifest of xml-file
    for (let i = 0; i < tasks.length; i++) { //looping through our array of objects
      xml += serializer.render(tasks[i]); //convert to XML format
    }
    xml += `</xml>`
    tasks = xml;

  }
  
  await fs.writeFile(`${user[0].firstname}_${user[0].lastname}_todo.${format}`, tasks, function(err) {
    if (err) {
        console.log(err);
    }
  });

  res.download(`${user[0].firstname}_${user[0].lastname}_todo.${format}`);

});

module.exports = router;
