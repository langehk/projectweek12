const mongoose = require("mongoose");

const PRIORITY = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
}

const taskSchema = mongoose.Schema({
    userID: String,
    description: String,
    startDate: String,
    deadline: String,
    status: {type: Boolean, default: false},
    priority: {type: String, enum: PRIORITY, default: PRIORITY.LOW},
    completionDate: String
});

const Task = mongoose.model("Task", taskSchema, 'task');

exports.Task = Task; 