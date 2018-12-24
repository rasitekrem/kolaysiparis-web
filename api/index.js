const mongoose = require('mongoose');
const express = require('express');
const app = express();
const configDB = require('./config/database');
const config = require('./config/config');
const auth = require('./routes/Auth')
const admin = require('./routes/Admin')
const verifyToken = require('./middleware/verifytoken')

mongoose.connect(configDB.database,{ useNewUrlParser: true })

app.set('api_secret_key',config.api_secret_key);
app.use('/admin',verifyToken)
app.use('/admin',admin)
app.use('/',auth);

module.exports = {
  path : "/api",
  handler : app
}