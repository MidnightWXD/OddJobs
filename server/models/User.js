const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
      required: false,
    },
    postCode: {
      type: String,
      required: false,
    },
    jobApplications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Posting'
      }
    ],
    activeJobs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Posting'
        }
    ],
    completedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Posting'
      }
    ],
    ratings: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Rating'
    }
    ],
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;