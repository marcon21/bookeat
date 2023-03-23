var mongoose = require("mongoose");

var PlateSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  price: Number,
});

var Plate = mongoose.model('Plate', PlateSchema);

module.exports = {
  Plate: Plate
}