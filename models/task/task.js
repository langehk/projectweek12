const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    _id: Number,
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