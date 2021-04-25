const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
  },
  password: {
    type: String,
    required: [true, 'A user must have password'],
    minlength: [6, 'A user password must have more than 6 characters'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'A user must have email'],
    unique: true,
    lowerCase: true,
  },
  phonenumber: {
    type: Number,
    required: [true, 'A user must have phone number'],
    unique: true,
    minlength: [10, 'A user phone number invalid'],
    maxlength: [10, 'A user phone number invalid'],
  },
  geometry: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      default: [72.611528, 22.998554],
    },
    required: false,
  },
});

const Users = mongoose.model('User', usersSchema);

module.exports = Users;
