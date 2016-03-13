import fetch from 'isomorphic-fetch';

const PRACTICES_URL = 'http://localhost:3002/api/practices';

module.exports = {
  put: body => {
    return fetch(PRACTICES_URL, {
      method: 'put',
      body: JSON.stringify(body)
    });
  }
};
