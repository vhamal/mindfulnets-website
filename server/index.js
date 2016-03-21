'use strict';

let dotenv = require('dotenv');
let express = require('express');
let morgan = require('morgan');
let path = require('path');

dotenv.config({silent: true});
let app = express();

// logging
app.use(morgan('combined'));

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// And run the server
let server = app.listen(process.env.PORT, () => {
 let port = server.address().port;
 console.log(`Server running on port ${port} in ${app.set('env')} environment`);
});
