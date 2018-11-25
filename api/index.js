const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const User = require('./models/userModel');
const config = require('./config/database');
const test = require('./routes/Test');
mongoose.connect(config.database,{ useNewUrlParser: true })
//app.use(test);

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

module.exports = {
  path : "/api",
  handler : app
}