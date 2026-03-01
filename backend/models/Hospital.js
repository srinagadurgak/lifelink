const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  rating: { type: Number, default: 4.0 },
  beds: { type: Number, required: true },
  emergency: { type: Boolean, default: true },
  bloodBank: [{
    type: { type: String },
    units: { type: Number }
  }],
  facilities: [String],
  createdAt: { type: Date, default: Date.now }
});

hospitalSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Hospital', hospitalSchema);
