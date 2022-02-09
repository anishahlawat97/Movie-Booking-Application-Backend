module.exports = (mongoose) => {
    var artist = new mongoose.Schema({
        artistid: { type: Number, require: true },
        first_name: { type: String, require: true },
        last_name: String,
        wiki_url: { type: String, default: "" },
        profile_url: { type: String, default: "" },
        movies: [{ type: String }],
    });
    var bookShows = new mongoose.Schema({
        id: { type: Number, require: true },
        theatre: { name: String, city: String },
        language: String,
        show_timing: String,
        available_seats: Number,
        unit_price: Number,
    });
    const Movie = mongoose.model(
        "movie", mongoose.Schema({
            movieid: {
                type: Number
            },
            title: {
                type: String,
                require: true
            },
            published: Boolean,
            released: Boolean,
            poster_url: {
                type: String,
                default: ""
            },
            release_date: String,
            publish_date: String,
            artists: [artist],
            genres: [String
                // genreid: { type: Number, require: true },
                // genre: { type: String, require: true },
            ],
            duration: {
                type: Number,
                default: 120,
                min: 80,
                max: 300
            },
            critic_rating: Number,
            trailer_url: String,
            wiki_url: String,
            story_line: String,
            shows: [bookShows]
        }, { timestamps: true })
    );
    return Movie;
}

