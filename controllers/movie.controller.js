const db = require('../models');
const Movie = db.movie;

exports.findAllMovies = (req, res) => {
    const status = req.query.status;
    let queryObj = {};
    
    if (status == "PUBLISHED") {
        queryObj.published = true;        
    }

    else if (status == "RELEASED") {
        queryObj.released = true;
        
        if(req.query.title){            
            queryObj.title = req.query.title;
        }

        if(req.query.genres){            
            let genresArray = req.query.genres;
            queryObj.genres = {$all: genresArray};
        }

        if(req.query.artists){
            const { first_name, last_name} = splitName(req.query.artists);
            queryObj["artists.first_name"] = { $all: first_name};
            queryObj["artists.last_name"] = { $all: last_name};
        }

        if(req.query.start_date && req.query.end_date){
            queryObj.release_date = {$gte: req.query.start_date, $lte: req.query.end_date}
        }       
       
    }    
    Movie.find(queryObj)
        .then(data => {
            res.status(200).send({
                movies: data,
                message: `${status} Movies fetched successfully`
            });
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || `Some error occured while fetching ${status} movies`
            });
        });
}

const splitName = (artists) => {
    const artistArray = artists.split(',');
    let first_name = [];
    let last_name = [];
    for(let i = 0; i<artistArray.length; i++){
        let split = artistArray[i].split(" ");
        first_name.push(split[0]);
        last_name.push(split[1]);
    }
    return {first_name, last_name};
}

exports.findOne = (req, res) => {
    const id = req.params.movieid;
    Movie.findOne({ movieid: id })
        .then(data => {
            res.status(200).send({
                movie: data,
                message: "Movie fetched by ID successfully"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching movie details by ID"
            });
        });
}

exports.findShows = (req, res) => {
    const id = req.params.movieid;
    Movie.findOne({ movieid: id })
        .then(data => {
            res.status(200).send({
                shows: data.shows,
                message: "Shows fetched successfully"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while fetching movie shows"
            });
        });
}