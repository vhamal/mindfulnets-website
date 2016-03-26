import callBackend from "./callBackend";

export default {
  getUserId() {
    if (localStorage.userId) {
      return callBackend(`/users/${localStorage.userId}`)
        .then(response => response.json())
        .then(user => user.id);
    }
    return callBackend("/users", {method: 'post'})
      .then(response => response.json())
      .then(user => {
        localStorage.userId = user.id;
        return user.id;
      });
  }
};
