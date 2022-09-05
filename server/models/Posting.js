const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const postingSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cost: {
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: String,
        // required: true
    },
    season: {
        type: String,
        // required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    applications: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    chosenWorker: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    workerNumber: {
        type: Number,
        required:false,
    }
  }
);

const Posting = model('Posting', postingSchema);

module.exports = Posting;