import fetch from 'isomorphic-fetch';

const PRACTICES_URL = 'http://localhost:3001/api/practices';

module.exports = {
  put: body => {
    return fetch(PRACTICES_URL, {
      method: 'put',
      body: JSON.stringify(body)
    });
  }
};
