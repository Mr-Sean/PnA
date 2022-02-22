const HeroController = require("../controllers/hero.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/heroes", authenticate, HeroController.createHero);
    
    app.get("/api/heroes", HeroController.getAllHeroes);

    app.get("/api/heroes/:username", authenticate, HeroController.findAllHeroesByUser);
    
    app.get("/api/heroes/:id", HeroController.getOneHero);

    app.put("/api/heroes/:id", HeroController.editHero);
    app.delete("/api/heroes/:id", HeroController.deleteHero);
};