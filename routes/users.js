var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// Route POST SignIn

router.post('/signin', (req, res) => {
  //Si les informations entrées ne correspondent pas ou sont manquantes, on retourne False
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    // Si les informations sont correctes, on vérifie si l'utilisateur est bien enregistré
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

// Route POST SignUp

router.post('/signup', (req, res) => {
  //Si les informations entrées ne correspondent pas ou sont manquantes, on retourne False
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Si les informations sont correctes, on vérifie si l'utilisateur est déjà enregistré
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
        canLike: true,
        canDelete: true,
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // Si l'utilisateur est déjà enregistré
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

// Route GET pour vérifier si l'utilisateur peut like un tweet

router.get('/canLike/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      res.json({ result: true, canLike: data.canLike });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});

// Route GET pour vérifier si l'utilisateur peut supprimer un tweet

router.get('/canDelete/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      res.json({ result: true, canDelete: data.canDelete });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});



module.exports = router;
