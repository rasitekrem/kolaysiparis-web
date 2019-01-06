var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  restaurantId: {
    type: String,
    unique: true,
    required: true
  },
  carts: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model('Cart', CartSchema);