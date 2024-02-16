const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: String,
    date: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],


});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;