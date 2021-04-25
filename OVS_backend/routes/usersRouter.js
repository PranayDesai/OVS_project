const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const authControllers = require('../controllers/authControllers');

const usersRouter = express.Router();
usersRouter.route('/addUser').post(authControllers.addUser);
usersRouter.route('/verifyUser').post(authControllers.verifyUser);
usersRouter.route('/:id').get(usersControllers.getUser);
usersRouter.route('/loginVerify').post(authControllers.loginVerify);
usersRouter.route('/login').post(authControllers.login);
module.exports = usersRouter;
