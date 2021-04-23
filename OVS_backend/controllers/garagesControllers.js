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

exports.getGaragesWithin = async (request, response, next) => {
  const { distance, latlng, unit, subCat } = request.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    response.status(400).json({
      status: 'fail',
      message: 'Please provide latitutr and longitude in the format lat,lng.',
    });
  }

  if (subCat.includes('top-pick')) {
    request.query.sort = '-ratingsAverage';
  }
  if (subCat.includes('newly-added')) {
    request.query.sort = '-createdAt';
  }
  if (subCat.includes('three-wheeler-only')) {
    console.log('Inside thre');
    request.query.categories = 'Three Wheeler';
    request.query.sort = '-ratingsAverage';
  }
  if (subCat.includes('four-wheeler-only')) {
    request.query.categories = 'Four Wheeler';
    request.query.sort = '-ratingsAverage';
  }
  if (subCat.includes('two-wheeler-only')) {
    request.query.categories = 'Two Wheeler';
    request.query.sort = '-ratingsAverage';
  }

  const query = new APIFeatures(
    Garages.find({
      geometry: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    }),
    request.query
  );
  query.filter().sort().limitFields().paginate();
  const garages = await query.query;

  // const garages = await Garages.find({
  //   geometry: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  // });

  response.status(200).json({
    status: 'success',
    results: garages.length,
    garages,
  });
};
