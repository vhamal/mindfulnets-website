import eventBus from "./eventBus";

module.exports = () => {
  eventBus.onclose = () => {
    // TODO unregister user in backend
  };
  
  if (!localStorage.userName) {
    localStorage.userName = `user-${Date.now()}`;
  }
  return localStorage.userName;
};
