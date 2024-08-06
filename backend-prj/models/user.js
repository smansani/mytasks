const mongoose = require('mongoose');
const { Schema } = mongoose;

const usershema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
  });

module.exports = mongoose.model('user', usershema);