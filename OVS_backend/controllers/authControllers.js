const Users = require('../models/usersModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const {
  loginValidation,
  registerationValidation,
} = require('../utils/validation');
const UserOTP = 9000;

exports.addUser = catchAsync(async (request, response, next) => {
  if (UserOTP === request.body.otp) {
    const { phonenumber, email, name, password } = request.body;

    //Validating obj
    const { error } = registerationValidation({
      phonenumber,
      email,
      name,
      password,
    });
    if (error) return next(new AppError('Validation Failed!', 404));

    const oldUser = await Users.find({
      $or: [
        { phonenumber: parseInt(phonenumber) },
        { email: email.toLowerCase() },
      ],
    });
    if (oldUser.length > 0)
      return next(new AppError('User already exits', 404));
    let newUser = await Users.create({
      name: name,
      password: password,
      phonenumber: parseInt(phonenumber),
      email: email.toLowerCase(),
    });

    //TOKEN CREATION

    response.status(200).json({
      status: 'success',
      newUser,
    });
  } else {
    return next(new AppError('Invalid OTP!', 404));
  }
});

exports.verifyUser = catchAsync(async (request, response, next) => {
  const { error } = registerationValidation({ ...request.body });
  if (error) return next(new AppError('Validation Failed!', 404));

  const { phonenumber, email } = request.body;

  const oldUser = await Users.find({
    $or: [
      { phonenumber: parseInt(phonenumber) },
      { email: email.toLowerCase() },
    ],
  });
  if (oldUser.length > 0) return next(new AppError('User already exits', 404));
  response.status(200).json({
    status: 'success',
    message: 'OTP send successfully',
  });
});

exports.login = catchAsync(async (request, response, next) => {
  const { email, password } = request.body;
  const user = await Users.find({
    email: email.toLowerCase(),
    password: password,
  });
  if (user.length <= 0) return next(new AppError('Invalid Credentials', 404));
  response.status(200).json({
    status: 'success',
    user,
  });
});
