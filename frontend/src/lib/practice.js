import callBackend from "./fetch";

module.exports = {
  updatePractice: body => callBackend("/practices", {method: 'put', body})
};
