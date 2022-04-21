
const MessageController = require("../controllers/message.controller");


module.exports = (app) => {

    app.get("/api/messages", MessageController.findAllMessages);
    app.post("/api/messages", MessageController.createNewMessage);
    app.put("/api/messages/:id", MessageController.likeMessage);


}