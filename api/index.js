const mongoose = require('mongoose');
const express = require('express');
const app = express();
const configDB = require('./config/database');
const config = require('./config/config');
const verifyToken = require('./middleware/verifytoken')
const auth = require('./routes/Auth')
mongoose.connect(configDB.database,{ useNewUrlParser: true })

app.set('api_secret_key',config.api_secret_key);
app.use('/admin',verifyToken)
app.use('/',auth);

module.exports = {
  path : "/api",
  handler : app
}