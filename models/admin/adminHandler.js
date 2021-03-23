const mongooseWrap = require ('../../lib/mongooseWrap');
const model = require('../user/user');

exports.readPending = async function (req, res){
    try {
        let pendingUsers = await mongooseWrap.retrieve(model.User, {rights: 'PENDING'});
        return pendingUsers;
    } catch (error) {
        
    }
}

exports.readUsers = async function (req, res){
    try {
        let users = await mongooseWrap.retrieve(model.User, {rights: 'USER'});
        return users;
    } catch (error) {
        
    }
}