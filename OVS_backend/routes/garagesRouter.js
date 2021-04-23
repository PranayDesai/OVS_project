const { Router } = require('express');
const express = require('express');
const garagesControllers = require('../controllers/garagesControllers');
const subGarages = new RegExp(
  '(top-pick|newly-added|three-vehicle-only|four-vehicle-only)',
  'g'
);
const garagesRouter = express.Router();

//For top-pick and newly-added
// garagesRouter
//   .route(subGarages)
//   .get(garagesControllers.aliasGarages, garagesControllers.getAllGarages);

// For geospatial location's
garagesRouter
  .route(
    '/garages-within/:distance/center/:latlng/unit/:unit/subCategory/:subCat'
  )
  .get(garagesControllers.getGaragesWithin);
// /garages-within?distance=233&center=-40,45&unit=mi
// /garages-within/233/center/-40,45/unit/mi
garagesRouter.route('/').get(garagesControllers.getAllGarages);

module.exports = garagesRouter;
