'use strict';

let dotenv = require('dotenv');
let express = require('express');
let morgan = require('morgan');
let http = require('http');
let httpProxy = require('http-proxy');
let path = require('path');

dotenv.config({silent: true});
let app = express();

// logging
app.use(morgan('combined'));

// TODO inject webpack-dev-server middleware

// We point to our static assets
let frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

// Browser communicates with express server which proxies to backend (both HTTP and WS protocols)

var proxy = new httpProxy.createProxyServer({
  target: process.env.BACKEND_URL
});

var httpProxyMw = function (req, res) {
  proxy.web(req, res);
};

app.use(httpProxyMw);

let server = http.createServer(app);

// Listen to the `upgrade` event and proxy the WebSocket requests as well
let wsProxyMw = function (req, socket, head) {
  proxy.ws(req, socket, head);
};
server.on('upgrade', wsProxyMw);

// And run the server
server.listen(process.env.PORT, () => {
 let port = server.address().port;
 console.log(`Server running on port ${port} in ${app.set('env')} environment`);
});
