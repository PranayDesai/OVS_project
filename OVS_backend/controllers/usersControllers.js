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

exports.updateUser = catchAsync(async (request, response, next) => {
  const queryObj = { ...request.body };
  const illegalFieldsToUpdate = ['email', 'phonenumber'];
  illegalFieldsToUpdate.forEach((field) => delete queryObj[field]);

  const updatedUser = await Garages.findByIdAndUpdate(req.params.id, queryObj, {
    new: true,
    runValidators: true,
  });
  if (!updatedGarage) return next(new AppError('No garages with this id'));
  response.status(200).json({
    status: 'success',
    message: 'Changes Updated successfully',
    data: updatedUser,
  });
});
