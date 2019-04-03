const mongoose = require('mongoose');
const express = require('express');
const app = express();
const configDB = require('./config/database');
const config = require('./config/config');
const auth = require('./routes/Auth')
const admin = require('./routes/Admin')
const verifyToken = require('./middleware/verifytoken')

mongoose.connect(configDB.database,{ useNewUrlParser: true })

app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');//mobile geçince buradan istek ayarı yapacağız
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Origin, Content-Type, Accept');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.set('api_secret_key',config.api_secret_key);
app.use('/admin',verifyToken)
app.use('/admin',admin)
app.use('/',auth);

module.exports = {
  path : "/api",
  handler : app
}