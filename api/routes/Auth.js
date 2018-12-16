const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require("../models/userModel");

router.post('/register', (req, res) => {
  console.log(req.body)
  const {
    restaurantName,
    username,
    password,
    repassword
  } = req.body;
  if (password !== repassword) {
    res.json({ status: false, message: "Parolalar uyuşmuyor"})
  } else {
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash,
      restaurantName
    });
    console.log(user)
    const promise = user.save();
    promise.then((data) => {
      const payload = {
        username
      }
      const token = jwt.sign(payload, req.app.get('api_secret_key'), {
        expiresIn: 43200
      })
      res.json({
        status: true,
        token,
        expiresIn: 43200
      })
    }).catch((err) => {
      res.json({ status: false, message: err.message})
    })
  })
}
});

router.post('/authenticate', (req, res) => {
  const {
    username,
    password
  } = req.body;
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      res.json(err)
    }
    if (!user) {
      res.json({
        status: false,
        message: "Kullanıcı bulunamadı"
      })
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: "Parola hatalı"
          })
        } else {
          const payload = {
            username
          }
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 43200
          })
          res.json({
            status: true,
            token,
            expiresIn: 43200
          })
        }
      })
    }
  })
});


router.post('/checkuser',(req,res) => {
    User.find({ username: req.body.data.email })
      .then(user => {
        if (user.length == 0) {
          res.status(200).json({ status : 'ok'});
        } else {
          res.status(200).json({ status : 'error'})
        }
        
      })
});

module.exports = router;
