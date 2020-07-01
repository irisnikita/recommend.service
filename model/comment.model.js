const { ObjectID } = require('mongodb');

// Libraries
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
let CommentSchema = new Schema({
    contactId: {type: Schema.Types.ObjectId, ref: 'user'},
    contact: Object,
    rate: Number,
    postId: {type: Schema.Types.ObjectId},
    dateCreate: {
        type: Date
    },
    description: String
});

module.exports = mongoose.model('comment', CommentSchema, 'comment');