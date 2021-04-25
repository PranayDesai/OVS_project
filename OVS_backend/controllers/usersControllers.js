const Users = require('../models/usersModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUser = async (request, response) => {
  try {
    const user = await Users.find({
      phonenumber: request.params.id * 1,
    });
    response.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    response.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
