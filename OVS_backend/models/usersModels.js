const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have name'],
  },
  password: {
    type: String,
    required: [true, 'A user must have password'],
  },
  email: {
    type: String,
    required: [true, 'A user must have email'],
    unique: true,
  },
  phonenumber: {
    type: Number,
    required: [true, 'A user must have phone number'],
    unique: true,
  },
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
