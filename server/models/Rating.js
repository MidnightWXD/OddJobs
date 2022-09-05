const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ratingSchema = new Schema({

    stars: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    byUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    forUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  }
);

const Rating = model('Rating', ratingSchema);

module.exports = Rating;