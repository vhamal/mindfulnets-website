import fetch from "isomorphic-fetch";

const BACKEND_URL = process.env.BACKEND_URL;

export default (relativeUrl, { body, method = 'get' } = {}) => {
  return fetch(`${BACKEND_URL}/api${relativeUrl}`, {
    method,
    body: JSON.stringify(body)
  })
    .then(response => response.json());
};
