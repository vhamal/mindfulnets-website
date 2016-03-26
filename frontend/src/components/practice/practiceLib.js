import fetch from "./../../lib/fetch";

export default {

  reset(totalSeconds) {
    return () => {
      updatePractice({
        totalSeconds,
        remainingSeconds: totalSeconds,
        started: false
      });
    }
  },

  startPause(totalSeconds, remainingSeconds, started) {
    return () => {
      updatePractice({
        totalSeconds,
        remainingSeconds,
        started
      });
    }
  }
};

function updatePractice(body) {
  return fetch("/practices", {method: 'put', body});
}
