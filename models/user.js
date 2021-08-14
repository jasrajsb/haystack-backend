const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ip:String,
    visits:[String]
}, { timestamps: true });

const model = mongoose.model('User', schema);

module.exports = model;
