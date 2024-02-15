const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    username: String,
    password: String,
    token: String,
    canLike: Boolean,
    canDelete: Boolean,

});

const User = mongoose.model('users', userSchema);

module.exports = User;