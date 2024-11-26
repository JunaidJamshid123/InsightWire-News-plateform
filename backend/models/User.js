const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date },
  phone: { type: String },
  country: { type: String },
  profilePicture: { 
    type: String, 
    default: 'https://via.placeholder.com/150', // Default placeholder image
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
