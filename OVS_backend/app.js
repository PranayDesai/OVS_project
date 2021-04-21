const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');

const gargesRouter = require('./routes/garagesRouter');

// MIDDLE_WARE
app.use(cors({ origin: '*' }));
app.use(express.json());
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use('/api/v1/garages', gargesRouter);

module.exports = app;
