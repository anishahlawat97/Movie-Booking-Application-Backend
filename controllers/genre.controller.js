const db = require('../models');
const Genres = db.genre;

exports.findAllGenres = (req, res) => {
    Genres.find({})
        .then(data => {
            res.status(200).send({
                genres: data,
                message: "Genres fetched successfully"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while fetching the genres"
            });
        });
}

