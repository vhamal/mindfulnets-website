'use strict';

let dotenv = require('dotenv');
let express = require('express');
let path = require('path');
let proxy = require('http-proxy-middleware');
let url = require('url');

dotenv.config({ silent: true });

let app = express();

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Browser communicates with express server which proxies to backend (both HTTP and WS protocols)
app.use(proxy(process.env.BACKEND_URL, { ws:true }));

// And run the server
app.listen(url.parse(process.env.WEBSITE_URL).port, () => {
  console.log(`Server running on ${process.env.WEBSITE_URL} in ${app.set('env')} environment`);
});
