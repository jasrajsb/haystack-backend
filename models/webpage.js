const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  url: String,
  visits: Number,
  visitors:[Schema.Types.ObjectId]
}, { timestamps: true });

const model = mongoose.model('Webpage', schema);

module.exports = model;
