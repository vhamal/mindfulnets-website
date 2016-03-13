'use strict';

let config = require('config');
let express = require('express');
let path = require('path');
let httpProxy = require('http-proxy');

let app = express();

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Browser communicates with express server which proxies to backend.
let proxy = httpProxy.createProxyServer();
app.all('/api/*', (req, res) => {
  proxy.web(req, res, { target: config.backend.url});
});

// And run the server
let server = app.listen(config.website.port, function () {
    // TODO use require('os').hostname(); when backend CORS handler supports it
    let host = 'localhost';
    let port = server.address().port;
    console.log('Server running on http://%s:%s in %s environment', host, port, app.set('env'));
});
