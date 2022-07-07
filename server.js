require('dotenv').config()
const express = require("express");
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/routes/routes');
const db = require('./app/firebase')
const winston = require('winston');
const expressWinston = require('express-winston');
const app = express();

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
    })
);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => { console.log('server is running on port ' + port)});

app.connect((err, resp) => {
    
})

app.use('/api', routes);
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found'});
})

console.log()

module.exports = app;