var express = require('express');
var router = express.Router();
const handler = require('../models/user/userHandler');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  await handler.createUser();
  res.send('respond with a resource');
});

module.exports = router;
