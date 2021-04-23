const { Router } = require('express');
const express = require('express');
const garagesControllers = require('../controllers/garagesControllers');
const subGarages = new RegExp(
  '(top-pick|newly-added|three-vehicle-only|four-vehicle-only)',
  'g'
);
const garagesRouter = express.Router();
garagesRouter
  .route(subGarages)
  .get(garagesControllers.aliasGarages, garagesControllers.getAllGarages);
garagesRouter.route('/').get(garagesControllers.getAllGarages);

module.exports = garagesRouter;
