const auth = require('../middleware/auth');

module.exports = (app) => {
    const movie = require('../controllers/movie.controller');
    var router = require('express').Router();
    
    //Find all Published or Released movies
    router.get("/movies", movie.findAllMovies);    

    //Find movie by ID
    router.get("/movies/:movieid", movie.findOne);

    //Find shows of a movie
    router.get("/movies/:movieid/shows", movie.findShows);

    app.use("/api", router);
}