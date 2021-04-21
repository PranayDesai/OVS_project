const mongoose = require('mongoose');

const garagesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Garages = mongoose.model('Garage', garagesSchema);

module.exports = Garages;
