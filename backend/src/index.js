const serverless = require("serverless-http");

// Import express
let express = require('express')

// Import Body parser
let bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');

// Initialise the app
let app = express();

// Import routes
let userRoutes = require("./routes/userRoutes")

// Configure bodyparser to handle post request
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://jeanne:9jh3VExRts0BINCm@cluster0.ehxlb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port 
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

// Use Api routes in the App
app.use('/api/users', userRoutes);

// Uncomment the following lines to test the redis caching locally.

// let photoRoutes = require("./routes/photoRoutes")
// app.use('/api/photos', photoRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports.index = serverless(app);