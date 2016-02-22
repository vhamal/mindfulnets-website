import React from 'react';
import bellFile from './bell.wav';

var bell = new Audio(bellFile);
const durationMinutes = [5, 10, 15, 20, 30, 45, 60];

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
    if (this.state.started) {
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
        disabled={this.state.remainingSeconds == d*60}
        ref={'duration' + d}
        onClick={this.setDuration.bind(this, d)}>
        {d} min
      </button>
    );

    return (
      <div>
        <div>{this.state.remainingSeconds} sec</div>
        <div>
          <button
            disabled={this.state.remainingSeconds == this.state.durationMinutes * 60
              && !this.state.started}
            ref='reset'
            onClick={this.reset.bind(this)}>
              Reset
          </button>
          <button
            disabled={this.state.remainingSeconds == 0}
            ref='startPause'
            onClick={this.startPause.bind(this)}>
              {this.state.started ? "Pause" : "Start"}
          </button>
          {durationButtons}
        </div>
      </div>
    );
  }
}