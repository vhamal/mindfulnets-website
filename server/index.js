import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config({silent: true});
let app = express();

// logging
app.use(morgan('combined'));

// TODO inject webpack-dev-server middleware

// We point to our static assets
app.use(express.static(`${__dirname}/../frontend/build`));

// And run the server
let server = app.listen(process.env.PORT, () => {
 const port = server.address().port;
 console.log(`Server running on port ${port} in ${app.set('env')} environment`);
});
