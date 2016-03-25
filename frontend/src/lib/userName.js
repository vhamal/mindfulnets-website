module.exports = () => {
  if (!localStorage.userName) {
    localStorage.userName = `user-${Date.now()}`;
  }
  return localStorage.userName;
};
