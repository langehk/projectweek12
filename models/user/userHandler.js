const model = require("./user");
const bcrypt = require("bcrypt"); 
const mongooseWrap = require ('../../lib/mongooseWrap');
//const Role = require('./user');

exports.readUser = async function(req, res, query){
  try {
      let userinfo = await mongooseWrap.retrieve(model.User, query);
      return userinfo;
      
  } catch (error) {
      console.log(error);
  }
}

exports.comparePassword = async function(plain, userinfo, req){
  //comparing plaintext (input) to hash value from database
  const loggedin = await bcrypt.compare(plain, userinfo[0].password);
  if(loggedin){
      req.session.authenticated = true;       // set session vars
      req.session.user = userinfo[0].email; 
      req.session.role =  userinfo[0].rights; 
  }

  return loggedin;
}

exports.createUser = async function(req, res){
    let hash = await bcrypt.hash(req.body.password, 10);

    let user = new model.User({
        email: req.body.email,
        password: hash, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
    
    await mongooseWrap.save(user); 
}