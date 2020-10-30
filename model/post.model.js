const {ObjectID} = require('mongodb');

// Libraries
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
let PostSchema = new Schema({
    address: Object,
    area: Number,
    contactId: String,
    contact: {type: Schema.Types.ObjectId, ref: 'user'},
    description: String,
    filter: Object,
    images: Array,
    infoBlock: Object,
    option: Object,
    price: Number,
    startTime: Date,
    endTime: Date,
    title: String,
    timeUpdate: Date,
    status: {
        type: Boolean,
        default: true
    },
    typePost: String
});

module.exports = mongoose.model('posts', PostSchema, 'posts');