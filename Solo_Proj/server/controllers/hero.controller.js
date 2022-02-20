const Hero = require("../models/hero.model");

module.exports = {
    createHero: (req, res) => {
        Hero.create(req.body)
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

}