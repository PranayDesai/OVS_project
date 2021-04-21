const { Router } = require('express');
const express = require('express');
const garagesControllers = require('../controllers/garagesControllers');

const garagesRouter = express.Router();
garagesRouter.route('/').get(garagesControllers.getAllGarages);

module.exports = garagesRouter;
