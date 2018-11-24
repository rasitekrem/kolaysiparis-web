const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect("mongodb://admin:Sifre.123@ds115434.mlab.com:15434/kolaysiparis",{ useNewUrlParser: true })

const User = mongoose.model('Users', {
  title: String,
  couponCode: String
})

app.get("/test", (req, res) => {
  let user = new User({
    username: 'user1234',
    password: '123qwe'
  })
  console.log(user)
  user.save()
  res.status(200).json()
})
