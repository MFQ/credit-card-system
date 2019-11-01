const mongoose = require('mongoose');
const CardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },{
    timestamps: true
  }
);

module.exports = mongoose.model('Card', CardSchema);