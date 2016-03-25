import callBackend from "./callBackend";

module.exports = {
  putPractice: body => {
    return callBackend("/practices", {method: 'put', body});
  }
};
