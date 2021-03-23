const model = require("./task");
const mongooseWrap = require ('../../lib/mongooseWrap');
const date = require('../../lib/date');

exports.readTask = async function(req, res, query){
    try {
        let tasks = await mongooseWrap.retrieve(model.Task, query);
        return tasks;
        
    } catch (error) {
        console.log(error);
    }
  }

exports.createTask = async function(req, res, userID){
    try {
        console.log(userID);
        let task = new model.Task({
            userID: userID,
            description: req.body.description,
            startDate: date.formatedDate(),
            deadline: req.body.deadline,
            priority: req.body.priority
        })
        console.log(task);
        await mongooseWrap.save(task);
    } catch (error) {
        console.log(error);
    }
}

exports.updateTask = async function(req, res, query, updateQuery){
    try {
        mongooseWrap.update(model.Task, query, updateQuery)
    } catch (error) {
        
    }
}

exports.removeTask = async function(req, res, query){
    try {
        mongooseWrap.delete(model.Task, query);
    } catch (error) {
        
    }
}