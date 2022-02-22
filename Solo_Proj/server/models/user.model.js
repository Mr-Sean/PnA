const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username Required"]
    },

    email: {
        type: String,
        required: [true, "Email Required"]
    },

    password: {
        type: String,
        required: [true, "Password Required"],
        minlength: [8, "Password MUST be at least 8 characters"]
    },

}, {timestamps: true});

// Virtual Field
    // Lets us to get info from our req,but will not
    // be saved to collection/db (need confirm pass, but not storing it)

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value)

// Middleware runs in the middle of an ongoing process
// Our validator automatically runs before any save middleware
UserSchema.pre("validate", function(next) {

    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords MUST match")
        console.log("Passwords don't match")
    }

    next()
})

UserSchema.pre("save", function(next) {
    console.log("in pre save");
        // hash the password BEFORE its saved to the DB
        // We know they match from middleware above
        bcrypt.hash(this.password, 10)
            .then((hashedPassword)=>{
            // give password the value of returned hash
            this.password = hashedPassword;
            next()
            }
        )
})

const User = mongoose.model("User", UserSchema);

module.exports = User;