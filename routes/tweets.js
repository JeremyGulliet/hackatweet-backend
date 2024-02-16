var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');

// route pour afficher les tweets présent en BDD

router.get('/', (req, res) => {
    Tweet.find()
        .populate('user')
        .populate('likes')
        .then(data => {
            if (data) {
                res.json({ result: true, tweet: data })
            } else {
                res.json({ result: false, error: 'No tweet found' })
            }
        });
});

// Route pour publier un tweet

router.post('/:token', (req, res) => {
    User.findOne({ token: req.params.token })
        .then(data => {
            console.log(data);
            if (data) {
                const newTweet = new Tweet({
                    user: data.id,
                    content: req.body.content,
                    date: new Date(),
                    likes: [],
                });
                newTweet.save().then(data => {
                    res.json({ result: true, tweet: data })
                });

            } else {
                res.json({ result: false })
            }
        })
})





module.exports = router;