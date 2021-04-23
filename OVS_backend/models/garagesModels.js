const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
  },
});

const service = new mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  img_url: {
    type: Number,
  },
});

const garagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    categories: {
      type: [String],
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    ratingsAverage: {
      type: Number,
    },
    img_url: {
      type: String,
    },
    geometry: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
    items: {
      type: [service],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Garages index
garagesSchema.index({ geometry: '2dsphere' });

const Garages = mongoose.model('Garage', garagesSchema);

module.exports = Garages;
