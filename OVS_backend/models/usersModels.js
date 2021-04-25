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
});

const Users = mongoose.model('User', usersSchema);

module.exports = Users;
