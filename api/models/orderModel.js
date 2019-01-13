var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  restaurantId: {
    type: String,
    unique: true,
    required: true
  },
  orders: {
    
  }
});

module.exports = mongoose.model('Cart', CartSchema);