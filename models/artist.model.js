module.exports = (mongoose) => {
    const Artist = mongoose.model(
        "artist", mongoose.Schema({
            artistid: {
                type: Number,
                require: true
            },
            first_name: {
                type: String,
                require: true
            },
            last_name: String,
            wiki_url: {
                type: String,
                default: ""
            },
            profile_url: {
                type: String,
                default: ""
            },
            movies: [{ type: String }],
        }, { timestamps: true })
    );
    return Artist;
};