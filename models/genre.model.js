module.exports = (mongoose) => {
    const Genre = mongoose.model(
        "genre", mongoose.Schema({
            genreid: {
                type: Number,
                require: true
            },
            genre: {
                type: String,
                require: true
            },
        }, { timestamps: true })
    );
    return Genre;
};