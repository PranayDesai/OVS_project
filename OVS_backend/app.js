const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');

const gargesRouter = require('./routes/garagesRouter');
const usersRouter = require('./routes/usersRouter');

// MIDDLE_WARE
app.use(cors({ origin: '*' }));
app.use(express.json());
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use('/api/v1/garages', gargesRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
