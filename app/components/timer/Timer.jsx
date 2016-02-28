import React from 'react';
import practices from '../practices';

var bell = new Audio(require('./bell.wav'));
const durationMinutes = [.1, 5, 10, 15, 20, 30, 45, 60];

export default class Timer extends React.Component {

  decrementAndCheck() {
    this.setState({remainingSeconds: --this.state.remainingSeconds});

    if(this.state.remainingSeconds <= 0) {
      this.startPause();
      bell.play();
    }
  }

  reset() {
    this.setState({remainingSeconds: this.durationMinutes * 60});
    if (this.state && this.state.started) {
      this.startPause();
    }
  }

  startPause() {
    if (this.state.started) {
      this.setState({started: false});
      window.clearInterval(this.timer);
    } else {
      this.setState({started: true});
      this.timer = window.setInterval(function () {
        this.decrementAndCheck();
      }.bind(this), 1000);
      // implementation similar to the above but in the backend
      // TODO cleanup/remove the local logic
      practices.post(this.state.durationMinutes * 60);
    }
  }

  setDuration(durationMinutes) {
    this.durationMinutes = durationMinutes;
    this.setState({durationMinutes: durationMinutes});
    this.reset();
  }

  componentWillMount() {
    this.durationMinutes = durationMinutes[0];
    this.setDuration(this.durationMinutes);
  }

  render() {
    var durationButtons = durationMinutes.map(d =>
      <button
        disabled={this.state.remainingSeconds == d*60 || this.state.started}
        key={'duration' + d}
        onClick={this.setDuration.bind(this, d)}>
        {d} min
      </button>
    );

    return (
      <div>
        <div>{this.state.remainingSeconds} s</div>
        <div>
          <button
            disabled={this.state.remainingSeconds == this.state.durationMinutes * 60
              && !this.state.started}
            onClick={this.reset.bind(this)}>
              Reset
          </button>
          <button
            disabled={this.state.remainingSeconds == 0}
            onClick={this.startPause.bind(this)}>
              {this.state.started ? "Pause" : "Start"}
          </button>
          {durationButtons}
        </div>
      </div>
    );
  }
}