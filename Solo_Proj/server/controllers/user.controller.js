const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

    register: (req, res) => {
        // Use the req data and user model constructor to create a user object
        const user = new User(req.body);
        
        // Info is already in instance fo THIS object, no need to pass anything in.
        // Save is an Instance Method. Doesn't require anything passed in.
        // Create is static and takes the object as a parameter
        user.save()
        .then((newUser) => {
            console.log(newUser);
            console.log("Successfully Registered");
            res.json({
                successMessage: "Thank you for registering",
                user: newUser
            })
        })
        .catch((err) => {
            console.log("Registration NOT Successful!")
            res.status(400).json(err);
        })
    },


    login: (req, res) => {
        User.findOne({email: req.body.email})
            .then((userRecord) => {
            // check if this returned obj is null
                if(userRecord === null) {
                // email not found
                res.status(400).json({message: "Invalid Login Credentials"})
                }
                else {
                    // email is found
                    //compare req.body.email to fields in the collection
                    bcrypt
                        //salt both 10x ...return promise BOOLEAN t/f
                        .compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if(isPasswordValid) {
                                console.log("Password is Valid");
                                res.cookie(
                                    "userToken",
                                    jwt.sign(
                                        {
                                            // Payload is the data we want to save
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        // we need a key to sign and hash cookie's data
                                        // Our payload needs a secret key. 
                                        // We will use a .env file to store such things privately. 
                                        // They won't be added to your public code. This private key is one example. 
                                        // Another can be our db name! these can be used throughout our app, using "process.keyName"
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        // Configuration settings for this cookie (options)
                                        // We'll make sure these cookies are "HttpOnly". 
                                        // This means that the cookies are essentially invisible to 
                                        // client-side JavaScript and can only be read by the server.
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    },                                
                                ).json({
                                    message: "Login Success!",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                });
                            }
                            else {
                                res.status(400).json({
                                    message: "Login and/or Email Invalid"
                                });
                            }                            
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: "Invalid Attempt"});
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: "Invalid Attempt"});
            });
    },


    logout: (req, res) => {
        console.log("Logging Out");
        res.clearCookie("userToken");
        res.json({
            message: "You have successfully Logged Out",
        });
    },


    getOneUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },


}