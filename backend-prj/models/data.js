const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  note: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Data', dataSchema);