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
    enum: {
      values: ['Four Wheeler', 'Three Wheeler', 'Two Wheeler'],
      message: 'categories is either: Four Wheeler Three Wheeler Two Wheeler',
    },
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    minlength: [1, 'A price should be greater than zero'],
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
      required: [true, 'A garage must have a name'],
      maxlength: [
        40,
        'A garage name must have less or equal then 40 characters',
      ],
      minlength: [
        5,
        'A garage name must have more or equal then 10 characters',
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'A garage must have password'],
      minlength: [6, 'A garage password must have more than 6 characters'],
      select: true,
    },
    categories: {
      type: [String],
      enum: {
        values: ['Four Wheeler', 'Three Wheeler', 'Two Wheeler'],
        message: 'categories is either: Four Wheeler Three Wheeler Two Wheeler',
      },
    },
    phonenumber: {
      type: Number,
      required: [true, 'A garage must have phone number'],
      unique: true,
      minlength: [10, 'A garage phone number must have 1 digit'],
      maxlength: [10, 'A garage phone number must have 1 digit'],
    },
    email: {
      type: String,
      required: [true, 'A garage must have email'],
      unique: true,
      lowerCase: true,
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
      coordinates: {
        type: [Number],
        default: [72.611528, 22.998554],
      },
      required: false,
    },
    service: {
      type: [service],
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Virtual populate for garage orders
garagesSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'garage',
  localField: '_id',
});

//Garages index
garagesSchema.index({ geometry: '2dsphere' });

const Garages = mongoose.model('Garage', garagesSchema);

module.exports = Garages;
