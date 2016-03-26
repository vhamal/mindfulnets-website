import callBackend from "./callBackend";

module.exports = {
  updatePractice: body => callBackend("/practices", {method: 'put', body})
};
