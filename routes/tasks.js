var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
  
  res.render('tasks', { title: 'Express' });
});

module.exports = router;
