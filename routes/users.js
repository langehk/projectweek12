var express = require('express');
var router = express.Router();
const handler = require('../models/user/userHandler');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Todo-list' });
});

router.get('/pending', function(req, res, next) {
  res.render('pending', { title: 'Todo-list: pending' });
});

router.get('/createuser', function(req, res, next) {
  res.render('createuser', { title: 'Todo-list: create new user' });
});

router.get('/acceptuser/:email', async function(req, res, next) {
  await handler.updateUser(req, res, {email: req.params.email}, {rights: 'USER'});
  res.redirect('../../todo');
});

router.get('/declineuser/:email', async function(req, res, next) {
  await handler.deleteUser(req, res, {email: req.params.email});
  res.redirect('../../todo');
});

router.post('/login', async function(req, res, next) { 
  let query = {email: req.body.email};
  handler.readUser(req, res, query).
    then(async function(userinfo) {
        const loggedin = await handler.comparePassword(req.body.password, userinfo, req);
        if(loggedin){
          res.redirect('../todo');
        }
        else{
          res.render('login', { message: 'Username or password incorrect' });
        }
    });
});

router.post('/createuser', async function(req, res){
  if(req.body.password == req.body.passwordRepeat){
    await handler.createUser(req);
    res.redirect('/users/pending');
  }
  else{
    res.render('createuser', {message: 'Passwords do not match'});
  }
  
})

module.exports = router;
