const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');

mongoose.connect("mongodb://admin:Sifre.123@ds115434.mlab.com:15434/kolaysiparis",{ useNewUrlParser: true })

const User = require('./models/userModel')
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {

  User.register({username:'username', active: false}, 'password', function(err, user) {
    if (err) { 
      console.log(err)
     }
     console.log("girdi")
  res.status(200).json()
      // Value 'result' is set to false. The user could not be authenticated since the user is not active
  });
  
})

module.exports = {
  path : "/api",
  handler : app
}