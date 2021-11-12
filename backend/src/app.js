const express = require('express')
const bodyParser = require('body-parser')

// Initialise the app
let app = express();

// Import routes
let userRoutes = require("./routes/userRoutes")

// Configure bodyparser to handle post request
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use Api routes in the App
app.use('/api', userRoutes);

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

module.exports = app;