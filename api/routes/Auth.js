const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");

router.post('/register', (req, res) => {
  console.log(req.body)
  const {
    restaurantName,
    username,
    password,
    repassword
  } = req.body;
  if (password !== repassword) {
    res.json({
      status: false,
      message: "Parolalar uyuşmuyor"
    })
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      const user = new User({
        username,
        password: hash,
        restaurantId: 'none',
      });
      const promise = user.save();
      promise.then((data) => {
        console.log(data)
        const payload = {
          id: data._id
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
        res.json({
          status: false,
          message: err.message
        })
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
            id: user._id
          }
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 43200
          })
          if (user.restaurantId === "none") {
            res.json({
              step: 1,
              status: true,
              token,
              expiresIn: 43200,
              id: user._id
            })
          } else {
            Restaurant.findById(user.restaurantId)
              .then(restaurant => {
                if (restaurant) {
                  res.json({
                    step: restaurant.step,
                    status: true,
                    token,
                    expiresIn: 43200,
                    id: user._id
                  })
                } else {
                  res.json({
                    step: 1,
                    status: true,
                    token,
                    expiresIn: 43200,
                    id: user._id
                  })
                }
              })
          }
        }
      })
    }
  })
});


router.post('/checkuser', (req, res) => {
  User.find({
      username: req.body.data.email
    })
    .then(user => {
      if (user.length == 0) {
        res.status(200).json({
          status: 'ok'
        });
      } else {
        res.status(200).json({
          status: 'error'
        })
      }

    })
});

module.exports = router;
