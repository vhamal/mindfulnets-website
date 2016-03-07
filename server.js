'use strict';

let express = require('express');
let path = require('path');

let app = express();

const PORT = 3002;
let publicPath = path.resolve(__dirname, 'build');

// We point to our static assets
app.use(express.static(publicPath));

// And run the server
let server = app.listen(PORT, function () {
    // TODO use require('os').hostname(); when backend CORS handler supports it
    let host = 'localhost';
    let port = server.address().port;
    console.log('Server running on http://%s:%s in %s environment', host, port, app.set('env'));
});