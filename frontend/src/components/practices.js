import fetch from 'isomorphic-fetch';

const PRACTICES_URL = `${process.env.BACKEND_URL}/api/practices`;

module.exports = {
  put: body => {
    return fetch(PRACTICES_URL, {
      method: 'put',
      body: JSON.stringify(body)
    });
  }
};
