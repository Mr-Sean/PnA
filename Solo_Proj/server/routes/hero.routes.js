const HeroController = require("../controllers/hero.controller");

module.exports = (app) => {
    app.post("/api/heroes", HeroController.createHero);
    app.get("/api/heroes", HeroController.getAllHeroes);
    app.get("/api/heroes/:id", HeroController.getOneHero);
    app.put("/api/heroes/:id", HeroController.editHero);
    app.delete("/api/heroes/:id", HeroController.deleteHero);
};