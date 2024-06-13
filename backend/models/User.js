const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ['student', 'signatory'],
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentId: String,
  program: String,
  year: String,
  status: {
    type: String,
    enum: ['regular', 'irregular'],
  },
  mobileNumber: String,
  email: String,
  department: String,
  role: {
    type: String,
    enum: ['treasurer', 'president', 'dean', 'cashier', 'registrar', 'vpsas'],
  },
});

module.exports = mongoose.model('User', UserSchema);
