const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema({
    
    heroName: {
        type:String,
        required: [true, "Must have a name entered!"],
        minLength: [5, "Hero name must have at least 5 characters!"]
    },

    heroOrigin: {
        type:String,
        required: [true, "Must have an Origin entered!"],
        minLength: [5, "Hero origin must have at least 5 characters!"]
    },

    heroPowers: {
        type:String,
        required: [true, "Must have a power entered!"],
        minLength: [5, "Hero powers must have at least 5 characters!"]
    },

    image: {
        type: String,
        required:  [true, "Hero needs a Picture!"]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rate"
        }
    ],


   
}, {timestamps: true});

// ("Hero Collection", HeroSchema)
const Hero = mongoose.model("Hero", HeroSchema);

module.exports = Hero;