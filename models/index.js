const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.artist = require('./artist.model')(mongoose);
db.genre = require('./genre.model')(mongoose);
db.movie = require('./movie.model')(mongoose);
db.user = require("./user.model")(mongoose);

module.exports = db;