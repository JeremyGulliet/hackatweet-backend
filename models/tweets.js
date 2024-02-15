const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    author: String,
    content: String,
    nbLike: Number,
    date: Date,
    likes: [ObjectId],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;