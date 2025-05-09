const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
