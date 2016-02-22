import React from 'react';
import Radium from 'radium';
import bellFile from './bell.wav';

var bell = new Audio(bellFile);
const totalSeconds = 5;

@Radium
export default class Timer extends React.Component {

  decrementAndCheck() {
    this.setState({remainingSeconds: --this.state.remainingSeconds});

    if(this.state.remainingSeconds <= 0) {
      this.startPause();
      bell.play();
    }
  }

  reset() {
    this.setState({remainingSeconds: totalSeconds});
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

  componentWillMount() {
    this.reset();
  }

  render() {
    const timeStyle = {
      padding: '5px'
    };

    const buttonStyle = {
      fontSize: '18px',
      border: 'none',
      background: 'cornsilk',
      cursor: 'pointer',
      padding: '3px',
      ':hover': {
        background: 'rgb(150, 181, 180)'
      }
    };

    return (
      <div>
        <div style={timeStyle}>{this.state.remainingSeconds}</div>
        <div>
          <button style={buttonStyle}
            disabled={this.state.remainingSeconds == totalSeconds && !this.state.started}
            ref='reset'
            onClick={this.reset.bind(this)}>
              Reset
          </button>
          <button style={buttonStyle}
            disabled={this.state.remainingSeconds == 0}
            ref='startPause'
            onClick={this.startPause.bind(this)}>
              {this.state.started ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    );
  }
}