const mongoose = require("mongoose");

const RateSchema = new mongoose.Schema({
    
    stars: {
        type: Number,
        enum: [1,2,3,4,5]
    },

    votes: {
        type: Number,
        default: 0,
    },

   
}, {timestamps: true});

// ("Rate Collection", RateSchema)
const Rate = mongoose.model("Rate", RateSchema);

module.exports = Rate;