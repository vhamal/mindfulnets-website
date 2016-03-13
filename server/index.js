'use strict';

let config = require('config');
let express = require('express');
let path = require('path');
let proxy = require('http-proxy-middleware');

let app = express();

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Browser communicates with express server which proxies to backend (both HTTP and WS protocols)
app.use(proxy(config.backend.url, { ws:true }));

// And run the server
let server = app.listen(config.website.port, function () {
    // TODO use require('os').hostname(); when backend CORS handler supports it
    let host = 'localhost';
    let port = server.address().port;
    console.log('Server running on http://%s:%s in %s environment', host, port, app.set('env'));
});
