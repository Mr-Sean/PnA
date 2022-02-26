// const mongoose = require('mongoose');
// const User = require('./user.model');

// //a rating question will contain scores
// //this is the schema for scores
// const scoreSchema = new mongoose.Schema({

//     score: {
//       type: Number,
//       enum:[1,2,3,4,5]
//     },
  
//     votes: {
//       type: Number,
//       default: 0,
//     }
  
//   });

// //Rating question schema
// const ratingSchema = new mongoose.Schema({

 
//     scores: [scoreSchema],

//     //who have voted on this rating question
//     //for prevent duplicted voting
//     voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

//     //who created this rating
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },

// }, {timestamps: true});

// module.exports = mongoose.model('Rating', ratingSchema);