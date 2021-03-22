const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    _id:  {type: Number, unique: true},
    title: String, 
    description: String,
    startDate: String,
    deadline: String,
    status: Boolean,
    priority: String,
    completionDate: String

});

const Task = mongoose.model("Task", taskSchema, 'task');

exports.Task = Task; 