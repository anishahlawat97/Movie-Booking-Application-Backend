const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');

db.mongoose.connect(
    db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
.then(() => {
    console.log("Connected to the Database");
})
.catch(err => {
    console.log("Cannot connect to the Database", err);
    process.exit();
});

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Movie Booking Application"
    });
});

require('./routes/artist.routes')(app);
require('./routes/genre.routes')(app);
require('./routes/movie.routes')(app);
require('./routes/user.routes')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('MBA-Client/build'));
}

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});