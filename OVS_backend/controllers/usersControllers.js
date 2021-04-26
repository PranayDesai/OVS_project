const Users = require('../models/usersModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/API_Features');

exports.getUser = async (request, response) => {
  try {
    const user = await Users.findById(request.params.id).populate('orders');
    if (!user)
      return next(new AppError('User with this id does not exist', 404));
    response.status(200).json({
      status: 'success',
      data: user,
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

  const updatedUser = await Users.findByIdAndUpdate(
    request.params.id,
    queryObj,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedUser) return next(new AppError('No user with this id'));
  response.status(200).json({
    status: 'success',
    message: 'Changes Updated successfully',
    data: updatedUser,
  });
});

exports.getAllUser = catchAsync(async (request, response, next) => {
  const features = new APIFeatures(Users.find(), request.query);
  features.filter().sort().limitFields().paginate();
  const users = await features.query;

  response.status(200).json({
    status: 'success',
    results: users.length,
    users,
  });
});
