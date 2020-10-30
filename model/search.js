// Libraries
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
let PostSchema = new Schema({
    value: String,
    province: String,
    district: String
});

module.exports = mongoose.model('search', PostSchema, 'search');