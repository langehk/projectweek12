var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.session.authenticated && req.session.role == 'ADMIN'){
    res.render('admin', { title: 'Express' });
  } else if(req.session.authenticated && req.session.role == 'USER'){
    res.render('todo', { title: 'Express' });
  } else if(req.session.authenticated && req.session.role == 'PENDING'){
    res.render('pending', { title: 'Express' });
  } else {
    res.redirect('../users/login')
  }
});

module.exports = router;
