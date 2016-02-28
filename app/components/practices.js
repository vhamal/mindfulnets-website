import fetch from 'isomorphic-fetch';

module.exports = {
  post: totalSeconds => {
    return fetch('http://localhost:3001/api/practices', {
      method: 'post',
      body: JSON.stringify({ totalSeconds })
    });
  }
};
