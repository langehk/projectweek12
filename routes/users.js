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

module.exports = router;
