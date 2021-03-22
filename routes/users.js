var express = require('express');
var router = express.Router();
const handler = require('../models/user/userHandler');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/login/:role', function(req, res, next) {
  let message; 
  if(req.params.role == 'pending' || req.params.role == 'user'){
    message = 'You are not logged in, please do so:';
  } else if(req.params.role == 'admin'){
    message = 'You are not an admin';
  }
  else {
    message = 'Create a user';
  }

  res.render('login', { message: message });
});

router.get('/admin', function(req, res, next) {
  if(req.session.authenticated && req.session.role == 'ADMIN'){
    res.render('admin', { title: 'Express' });
  }
  else{
    res.send('You are not an admin');
  }
});

router.get('/pending', function(req, res, next) {
  if(req.session.authenticated && req.session.role == 'PENDING'){
    res.render('pending', { title: 'Express' });
  }
  else{
    res.redirect('./login/pending' )
  }  
});

router.post('/login', async function(req, res, next) { 
  let query = {email: req.body.email};
  handler.readUser(req, res, query).
    then(async function(userinfo) {
        const loggedin = await handler.comparePassword(req.body.password, userinfo, req);
        if(loggedin && req.session.role == 'ADMIN'){
          res.redirect('./admin');
        }
        if(loggedin && req.session.role == 'USER'){
          res.redirect('../todo');
        }
        if(loggedin && req.session.role == 'PENDING'){
          res.redirect('./pending');
        }
        else{
          
        }
    });
});

module.exports = router;
