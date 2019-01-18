var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
  restaurantId: {
    type: String,
    unique: true,
    required: true
  },
  histories: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model('History', HistorySchema);