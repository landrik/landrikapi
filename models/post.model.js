const mongoose = require('mongoose');
const schema = mongoose.Schema;


const PostSchema = new schema({
    image: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    published_date: {
      type: Date
    },
    updated_date: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('post', PostSchema);

