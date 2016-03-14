'use strict';

let dotenv = require('dotenv');
let express = require('express');
let path = require('path');
let proxy = require('http-proxy-middleware');
let setupEnvironmentVariables = require('./env');

setupEnvironmentVariables();

let app = express();

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Browser communicates with express server which proxies to backend (both HTTP and WS protocols)
app.use(proxy(process.env.BACKEND_URL, { ws:true }));

// And run the server
app.listen(process.env.WEBSITE_PORT, () => {
  console.log(`Server running on ${process.env.WEBSITE_URL} in ${app.set('env')} environment`);
});
