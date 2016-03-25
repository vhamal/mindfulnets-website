const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

dotenv.config({silent: true});
const app = express();

// logging
app.use(morgan('combined'));

// TODO inject webpack-dev-server middleware

// We point to our static assets
app.use(express.static(`${__dirname}/../frontend/build`));

// And run the server
const server = app.listen(process.env.PORT, () => {
 const port = server.address().port;
 console.log(`Server running on port ${port} in ${app.set('env')} environment`);
});
