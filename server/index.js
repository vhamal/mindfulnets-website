'use strict';

let dotenv = require('dotenv');
let express = require('express');
let morgan = require('morgan');
let path = require('path');
let proxy = require('http-proxy-middleware');

dotenv.config({silent: true});

let app = express();

// logging
app.use(morgan('combined'));

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Browser communicates with express server which proxies to backend (both HTTP and WS protocols)
app.use(proxy(process.env.BACKEND_URL, { ws:true }));

// And run the server
console.log("port: ", process.env.PORT);
let server = app.listen(process.env.PORT, () => {
  let port = server.address().port;
  console.log(`Server running on port ${port} in ${app.set('env')} environment`);
});
