import fetch from "isomorphic-fetch";

const BACKEND_URL = process.env.BACKEND_URL;

export default (relativeUrl, { body, method = 'get' } = {}) => {
  const absoluteUrl = `${BACKEND_URL}/api${relativeUrl}`;
  const serializedBody = JSON.stringify(body);
  console.log(`Calling ${method} ${absoluteUrl}${serializedBody? ` with ${serializedBody}`:''}`);
  return fetch(absoluteUrl, {
    method,
    body: serializedBody
  });
};
