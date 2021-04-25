const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const authControllers = require('../controllers/authControllers');

const usersRouter = express.Router();
usersRouter.route('/addUser').post(authControllers.addUser);
usersRouter.route('/verifyUser').post(authControllers.verifyUser);
usersRouter.route('/login').post(authControllers.login);
usersRouter.route('/:id').get(usersControllers.getUser);
module.exports = usersRouter;
