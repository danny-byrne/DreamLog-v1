const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String, 
    required: true,
    unique: false,
    trim: true,
    minLength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 3
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema)

module.exports = User;