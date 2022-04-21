const Hero = require("../models/hero.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const heroRoutes = require("../routes/hero.routes");

module.exports = {
    createHero: (req, res) => {

        const newHeroObject = new Hero(req.body);

        // const decodedJWT = jwt.decode(req.cookies.usertoken,{
        //     complete: true
        // })
        // newHeroObject.createdBy = decodedJWT.payload.id

        // Shorter version of above code using jwtpayload in jwt.config
        newHeroObject.createdBy = req.jwtpayload.id;
        
        newHeroObject.save()
            .then((newHero) => {
                console.log(newHero);
                res.json(newHero)
            })
            .catch((err) => {
                console.log("Something went wrong in createHero");
                res.status(400).json(err);
            })
    },

    getOneHero: (req, res) => {
        Hero.findOne({_id: req.params.id})
            .populate("messages", "content likes")
            .then((oneHero) => {
                console.log(oneHero);
                res.json(oneHero)
            })
            .catch((err) => {
                console.log("findOne Hero Failed");
                res.json({ message: 'Something went wrong in getOneHero', error: err});
            })
    },
    
    getAllHeroes: (req, res) => {
        Hero.find({}).collation({locale:"en", strength: 2}).sort({HeroName:1})
            .populate("createdBy", "username email")
            .populate("messages", "content _id")
            .then((allHeroes) => {
                res.json(allHeroes)
            })
            .catch((err) => {
                console.log("getAllHeroes Failed");
                res.status(400).json("Something went wrong in getAllHeroes");
            })
    },
    
    deleteHero: (req, res) => {
        Hero.deleteOne({_id: req.params.id})
        .then((deletedHero) => {
            res.json(deletedHero)
        })
        .catch((err) => {
            console.log("deleteHero Failed");
            res.status(400).json("Something went wrong in deleteHero");
        })
    },
    
    editHero: (req, res) => {
        Hero.findByIdAndUpdate({_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true                
            })
            .then((updatedHero) =>{
                console.log(updatedHero);
                res.json(updatedHero);
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    },

    findAllHeroesByUser: (req, res) => {
        if(req.jwtpayload.username !== req.params.username) {
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn) => {
                    Hero.find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((allHeroesFromUser) => {
                            console.log(allHeroesFromUser);
                            res.json(allHeroesFromUser);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
                }
                else {
                    Hero.find({createdBy: req.jwtpayload.id})
                        .populate("createdBy", "username")
                        .then((allHeroesFromLoggedInUser) => {
                            console.log(allHeroesFromLoggedInUser);
                            res.json(allHeroesFromLoggedInUser);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json(err);
                    })
        }
    },

    addToRatings: (req, res) => {
        console.log("Testing" ,req.body.ratings);
        Hero.findByIdAndUpdate({_id: req.params.id},
            {
                $push: {ratings: req.body.ratings}
            },

            {
                new: true,
                useFindAndModify: false
            })
            .then((updatedHero) =>{
                updatedHero.ratings = 
                console.log(updatedHero);
                res.json(updatedHero);
            })
            .catch((err) => {
                console.log(err)
                // res.status(400).json(err);
            })
    },

}