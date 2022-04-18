const mongoose = require("mongoose");
const User = require('./user.model');

const RateSchema = new mongoose.Schema({
    
    starRating: {
        type: Number,
        default: 0,
        enum:[1,2,3,4,5]
    },


    associatedHero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hero"
    },
    
    associatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    // to prevent duplicate ratings
    rated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    
}, {timestamps: true});

// ("Rate Collection", RateSchema)
const Rate = mongoose.model("Rate", RateSchema);

module.exports = Rate;