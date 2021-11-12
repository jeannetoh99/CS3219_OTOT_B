const serverless = require("serverless-http");

const mongoose = require('mongoose');

const app = require('./app');

// Setup server port 
var port = process.env.PORT || 8080;

var env = process.argv[2] || 'dev'
const mongodbUrl = env === 'dev' ? 'mongodb://localhost/test' : 'mongodb+srv://jeanne:9jh3VExRts0BINCm@cluster0.ehxlb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// Connect to Mongoose and set connection variable
mongoose.connect(mongodbUrl, { useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB');
    // Launch app to listen to specified port
    app.listen(port, function () {
        console.log("Running on port " + port);
    });
})

module.exports.index = serverless(app);