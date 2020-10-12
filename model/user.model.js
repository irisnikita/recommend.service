// Libraries
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
let UserSchema = new Schema({
    fullName: {
        type: String,
        trim: true
    },
    userName: {
        type: String,
        trim: true,
        required: true
    },
    address: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    sex: String,
    province: String,
    avatar: {
        type: String,
        default: ''
    },
    phoneNumber: String,
    transactions: Array
});

UserSchema.methods.comparePassword = function(pass) {
    return bcrypt.compareSync(pass, this.pass);
};

module.exports = mongoose.model('user', UserSchema, 'user');