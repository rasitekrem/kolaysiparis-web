var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  restaurantId: {
    type: String,
    unique: true,
    required: true
  },
  orders: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model('Order', OrderSchema);