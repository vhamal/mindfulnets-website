var dotenv = require('dotenv');

module.exports = () => {
  dotenv.config({silent: true});

  process.env.WEBSITE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
  process.env.WEBSITE_HOST = process.env.HOST;
  process.env.WEBSITE_PORT = process.env.PORT;
  delete process.env.HOST;
  delete process.env.PORT;
};
