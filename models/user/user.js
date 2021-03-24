const mongoose = require("mongoose");

const Role = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    PENDING: 'PENDING'
}

const userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
    rights: {type: String, enum: Role, default: Role.PENDING}
});

const User = mongoose.model("User", userSchema, 'user');

exports.User = User; 
exports.Role = Role;