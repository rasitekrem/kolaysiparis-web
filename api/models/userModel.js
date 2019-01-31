var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  restaurantId: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "Admin"
  },
  authority: {
    type: Object,
    default: {
      day: true,
      cash: true,
      order: true
    }
  }
});

module.exports = mongoose.model('User', UserSchema);