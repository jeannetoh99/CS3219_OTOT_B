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

var cors = require('cors')
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

// Use Api routes in the App
app.use('/api', userRoutes);

const { errorConverter, errorHandler } = require('./middlewares/error');
// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

module.exports = app;