import fetch from "./fetch";

const BASE_URL = "/users";

export default {
  getUser() {
    if (localStorage.userId) {
      return fetch(`${BASE_URL}/${localStorage.userId}`);
    }
    return fetch(BASE_URL, {method: 'post'})
      .then(user => {
        localStorage.userId = user.id;
        return user;
      });
  },

  getUsers() {
    return fetch(BASE_URL);
  }
};
