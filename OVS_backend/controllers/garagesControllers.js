const Garages = require('../models/garagesModels');
const APIFeatures = require('../utils/API_Features');

exports.getAllGarages = async (request, response) => {
  try {
    const features = new APIFeatures(Garages.find(), request.query);
    features.filter().sort().limitFields().paginate();
    const garages = await features.query;

    response.status(200).json({
      status: 'success',
      results: garages.length,
      garages,
    });
  } catch (err) {
    response.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.aliasGarages = async (request, response, next) => {
  const subUrl = { ...request };
  if (subUrl.url.includes('top-pick')) {
    request.query.sort = '-ratingsAverage';
  }
  if (subUrl.url.includes('newly-added')) {
    request.query.sort = '-createdAt';
  }
  if (subUrl.url.includes('three-vehicle-only')) {
    console.log('Inside thre');
    request.query.categories = 'Three Wheeler';
  }
  if (subUrl.url.includes('four-vehicle-only')) {
    request.query.categories = 'Four Wheeler';
  }
  next();
};
