module.exports = (app) => {
    const genre = require('../controllers/genre.controller');
    var router = require('express').Router();

    //Retrieve all genres
    router.get('/genres',genre.findAllGenres);

    app.use("/api", router);
}