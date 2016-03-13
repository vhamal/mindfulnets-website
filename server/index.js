'use strict';

let config = require('config');
let express = require('express');
let path = require('path');
let proxy = require('http-proxy-middleware');
let url = require('url');

let app = express();

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Browser communicates with express server which proxies to backend (both HTTP and WS protocols)
app.use(proxy(config.backend.url, { ws:true }));

// And run the server
app.listen(url.parse(config.website.url).port, () => {
  console.log(`Server running on ${config.website.url} in ${app.set('env')} environment`);
});
