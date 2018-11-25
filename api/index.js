const mongoose = require('mongoose');
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/userModel');
var morgan = require('morgan');
var config = require('./config/database');

mongoose.connect(config.database,{ useNewUrlParser: true })

app.use(require('express-session')({
  secret: "KolaySiparis",
  resave: false,
  saveUninitialized: false
}));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res) => {
  res.send({ result: 'Tebrikler!!'})
})
app.post("/signup", (req, res) => {
  console.log(req.body)
  User.register({username: 'testuser123', active: false}, 'testpassword', function(err, user) {
    if (err) { 
      console.log(err)
     }
     passport.authenticate("local")(req,res,() => {
        res.json()
     })
  });
})
app.post("/signin", passport.authenticate("local") ,(req, res) => {
  res.status(200).json()
})
app.get("/logout", (req,res) => {
  req.logout;
  res.status(200).json()
})
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(200).json();
}
// function isLoggedIn(req,res,next) {
//   if (global.currentUser) {
//     return next();
//   } else {
//     res.redirect("signin");
//   }
// }
module.exports = {
  path : "/api",
  handler : app
}