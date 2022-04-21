const Message = require('../models/message.model');
const Hero = require('../models/hero.model');


module.exports = {



    findAllMessages: (req, res) => {
        // use model to connect to the collection & 
            // find/return all docs from heroes collection  
        Message.find()
            .then((allMessages) => {
                console.log(allMessages);
                res.json(allMessages);
            })
            .catch((err) => {
                console.log("Find All Messages FAILED");
                res.json({ message: "Something went wrong in findAll", error: err })
            })
    },


    createNewMessage :(req, res)=>{

        Message.create(req.body)
        
            .then((messagePosted)=>{
                console.log(messagePosted);
                console.log("req.body.associatedHero", req.body.associatedHero);
                
                Hero.findOneAndUpdate(req.body.associatedHero,
                    {
                        $addToSet: {messages: messagePosted._id}
                    },{
                        new: true,
                        useFindAndModify: true
                    })
                    .populate("messages", "content _id")
                    .then((heroToUpdate)=>{
                        console.log(heroToUpdate)
                        res.json(messagePosted)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })

    },

    likeMessage: (req, res) =>{
        Message.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new:true, runValidators: true}
            )
            .populate("associatedHero", "heroOrigin heroPowers")
            .then((likeAdded)=>{
                res.json(likeAdded)
            })
            .catch((err)=>{
                res.status(400).json(err);
            })
    }


}
