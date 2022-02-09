const db = require('../models');
const Artist = db.artist;

exports.findAllArtists = (req, res) => {
    Artist.find({})
    .then(data => {
        res.status(200).send({
            artists: data,
            message:"Artists fetched Succesfully"
        });
    })
    .catch(err => {
        res.status(404).send({
            message: err.message || " Some error occured while fetching the artists"
        })
    })
}