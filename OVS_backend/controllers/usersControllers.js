const Users = require('../models/usersModels');
const {
  loginValidation,
  registerationValidation,
} = require('../utils/validation');
const UserOTP = 9000;

exports.addUser = async (request, response) => {
  try {
    if (UserOTP === request.body.otp) {
      let queryObj = { ...request.body };
      delete queryObj['otp'];
      let user = await Users.create(queryObj);
      response.status(200).json({
        status: 'success',
        user,
      });
    } else {
      throw new Error('Invalid OTP!');
    }
  } catch (err) {
    response.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.verifyUser = async (request, response) => {
  try {
    const { error } = registerationValidation(request.body);
    if (error) {
      throw new Error('Validation Failed');
    }

    const phoneNumberExists = await Users.find({
      phonenumber: parseInt(request.body.phonenumber),
    });
    if (phoneNumberExists === []) {
      console.log('Inside registervalid');
      throw new Error('Phone Number Exist');
    }

    const emailExists = await Users.find({
      email: request.body.email,
    });
    if (emailExists === []) {
      console.log('Inside registervalid');
      throw new Error('Email already Exist');
    }

    response.status(200).json({
      status: 'success',
      message: 'OTP send successfully',
    });
  } catch (err) {
    response.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
