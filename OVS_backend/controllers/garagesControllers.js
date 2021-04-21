const Garages = require('../models/garagesModels');

exports.getAllGarages = async (request, response) => {
  try {
    let query = Garages.find();

    const AllGarages = await query;
    response.status(200).json({
      status: 'success',
      results: AllGarages.length,
      garages: AllGarages,
    });
  } catch (err) {
    response.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
