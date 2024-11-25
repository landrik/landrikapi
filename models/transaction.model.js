const mongoose = require('mongoose');
const schema = mongoose.Schema;


const TransactionSchema = new schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required:[true, 'Please add a positive or negative number']
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('transaction', TransactionSchema);


