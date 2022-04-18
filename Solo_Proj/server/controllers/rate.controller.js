// const Rate = require("../models/rate.model");
// const Hero = require("../models/hero.model");
// const User = require("../models/user.model");

// const rateRoutes = require("../routes/rate.routes");

// const jwt = require("jsonwebtoken");

// module.exports = {
    
//     addRating: (req, res) => {
        
//         const newRatingObject = new Rating(req.body);

//         //grab logged userid from cookie & assign current 
//         // logged user's id to this new rating
//         newRatingObject.associatedUser = req.jwtpayload.userid;

//         newRatingObject.rate = [
//             {"starRating": 1}, 
//             {"starRating": 2}, 
//             {"starRating": 3}, 
//             {"starRating": 4}, 
//             {"starRating": 5}
//         ]

//         newRatingObject.save()
//             .then((newRating)=>{
//                 console.log(newRating);
//                 res.json(newRating)
//             })
//             .catch((err)=>{
//                 console.log("addRating Error");
//                 res.status(400).json(err);
//             })
//     },

//     findAllRatings: (req, res) =>{
//         Rating.find()
//             .populate("associatedUser", "username")
//             .then((allRating)=>{
//                 res.json(allRating);
//             })
//             .catch((err)=>{
//                 console.log("Find All Ratings ERROR");
//                 res.json({message: "findAllRatings ERROR", error: err})
//             })
//     },

//     findOneRating: (req, res) => {
//         Rating.findById({_id: req.params.ratingid})
//             .then((oneRating)=>{
//                 console.log(oneRating);
//                 res.json(oneRating)
//             })
//             .catch((err)=>{
//                 console.log("Find One Rating ERROR");
//                 res.json({message: "findOneRating ERROR", error: err})
//             })
//     },

//     findAllRatingsByUser: (req, res) => {
//         //Verify inputted username & PW match cookie
//         //only the logged in user should see their ratings
//         if(req.jwtpayload.username !== req.params.username){
//             console.log("Un-authenticated USER!!!")
//             res.status(401).json({message: "Un-authenticated USER!!!"});
//         }
//         else{
//             console.log("user authenticated")
//             console.log("req.jwtpayload.username:", req.jwtpayload.username);
//             Rating.find({associatedUser: req.jwtpayload.userid})
//                 .populate("associatedUser", "username")
//                 .then((allRatingsFromLoggedInUser)=>{
//                     console.log(allRatingsFromLoggedInUser);
//                     res.json(allRatingsFromLoggedInUser);
//                 })
//                 .catch((err)=>{
//                     console.log(err);
//                     res.status(400).json(err);
//                 })
//         }
//     },


//     deleteRating: (req, res) => {
//         Rating.deleteOne({_id: req.params.ratingid})
//         .then((deleteConfirm) => {
//             console.log(deleteConfirm);
//             res.json(deleteConfirm);
//         })
//         .catch((err) => {
//             console.log("Delete Rating ERROR");
//             res.json({message: "deleteRating ERROR", error: err});
//         })
//     },

//     checkRating: async(req, res, next) => {

//         const ratingid  = req.params.ratingid;
//         const userid = req.jwtpayload.userid;

            
//             //check if the user has already rated and prevent duplicate rating
//             if (rating.rated.filter(user => user.toString() === userid).length <= 0) {
//                 rating.rated.push(userid);
//                 rating.rated = rate;
//               await rating.save();
      
//               return res.status(202).json(rating);
//             } else {
//               res.json({message:"This user already rated"})
//             }
//           } else {
//             res.json({message:"Did not submit a rating"})
//           }
//         } catch (err) {
//           return next({
//             status: 400,
//             message: err.message,
//           });
//         }
//     },

// }