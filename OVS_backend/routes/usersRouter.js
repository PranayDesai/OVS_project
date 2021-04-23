const express = require('express');
const usersControllers = require('../controllers/usersControllers');

const usersRouter = express.Router();
usersRouter.route('/').post(usersControllers.addUser);
usersRouter.route('/verifyUser').post(usersControllers.verifyUser);
usersRouter.route('/:id').get(usersControllers.getUser);
module.exports = usersRouter;
