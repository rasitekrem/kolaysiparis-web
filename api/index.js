const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken')
const User = require('./models/userModel');
const configDB = require('./config/database');
const config = require('./config/config');
const verifyToken = require('./middleware/verifytoken')
mongoose.connect(configDB.database,{ useNewUrlParser: true })

app.set('api_secret_key',config.api_secret_key);
app.use('/',verifyToken)
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password,10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err)
    })
  })
})
app.post("/authenticate",(req,res) => {
  const { username, password } = req.body;
  User.findOne({
    username
  }, (err,user) => {
    if (err) {
       throw err;
    }
    if(!user){
      res.json({
        status: false,
        message: "Authentication failed,user not found!"
      })
    } else {
      bcrypt.compare(password,user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: "Authentication failed, wrong password"
          })
        } else {
          const payload = {
            username
          }
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{
            expiresIn: 720
          })
          res.json({
            status: true,
            token
          })
        }
      })
    }
  })
})
module.exports = {
  path : "/api",
  handler : app
}