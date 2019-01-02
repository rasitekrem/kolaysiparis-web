var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  restaurantName: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  step: {
    type: String,
    default: '1',
    required: true
  },
  tables: {
    type: Object,
    required: false
  },
  categories: {
    type: Object,
    required: false
  }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
