import fetch from "./../../lib/fetch";

module.exports = {
  updatePractice: body => fetch("/practices", {method: 'put', body})
};
