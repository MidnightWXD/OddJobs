const db = require('../config/connection');
const { Rating, User, Posting } = require('../models');

const ratingData = require('./ratingData.json');
const userData = require('./userData.json');
const postingData = require('./postingData.json');

db.once('open', async () => {
    // clean database
    await Rating.deleteMany({});
    await User.deleteMany({});
    await Posting.deleteMany({});
  
    // bulk create each model
    const ratings = await Rating.insertMany(ratingData);
    const users = await User.insertMany(userData);
    const postings = await Posting.insertMany(postingData);
    console.log(postings);
    for (newUsers of users) {

      // randomly add Users to apply for posting application
      const tempPostingApplication = postings[Math.floor(Math.random() * postings.length)];
      tempPostingApplication.applications.push(newUsers._id)
      await tempPostingApplication.save(); 

      // randomly add each User to be the ratings leaver
      const tempRatingBy = ratings[Math.floor(Math.random() * ratings.length)];
      tempRatingBy.byUser = newUsers._id;
      await tempRatingBy.save();

      // randomly add each User to a rating reciever
      const tempRatingFor = ratings[Math.floor(Math.random() * ratings.length)];
      tempRatingFor.forUser = newUsers._id;
      await newUsers.save();
    }

    for ( var i = 0; i < postings.length; i++ ) {
      postings[i].owner = users[i]._id;
      await postings[i].save();
    }

    for (newPostings of postings) {

      // randomly add a posting to User job application
      const tempUserJobApplication = users[Math.floor(Math.random() * users.length)];
      tempUserJobApplication.jobApplications.push(newPostings._id);
      await tempUserJobApplication.save(); 
      
      // randomly add a posting to User active jobs
      const tempUserActiveJobs = users[Math.floor(Math.random() * users.length)];
      tempUserActiveJobs.activeJobs.push(newPostings._id);
      await tempUserActiveJobs.save(); 
      
      // randomly add a posting to User completed jobs
      const tempUserCompletedJobs = users[Math.floor(Math.random() * users.length)];
      tempUserCompletedJobs.completedJobs.push(newPostings._id);
      await tempUserCompletedJobs.save(); 
    }

    for ( newRatings of ratings) {

      // randomly add each User to a rating reciever
      const tempUserRatings = users[Math.floor(Math.random() * users.length)];
      tempUserRatings.ratings = newRatings._id;
      await tempUserRatings.save(); 
    }

    console.log('all done!');
    process.exit(0);
  });