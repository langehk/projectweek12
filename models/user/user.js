const mongoose = require("mongoose");

const Role = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

const userSchema = mongoose.Schema({
    //_id:  Number,
    email: {type: String, unique: true},
    password: String,
    firstname: String, 
    lastname: String,
    rights: {type: String, enum: Role, default: Role.USER}
});

const User = mongoose.model("User", userSchema, 'user');

exports.User = User; 
exports.Role = Role;