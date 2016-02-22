import React from 'react';
import Radium from 'radium';
import bellFile from './bell.wav';

var bell = new Audio(bellFile);
var myState = {};

@Radium
export default class Timer extends React.Component {

  checkTime() {
    this.setState(myState);
    myState.remainingSeconds--;

    if(myState.remainingSeconds < 0) {
      this.stop();
      bell.play();
    }
  }

  reset() {
    this.stop();
    myState.remainingSeconds = 5;
    this.checkTime();
  }

  start() {
    myState.counting = true;
    this.setState(myState);
    this.timer = window.setInterval(function () {
      this.checkTime();
    }.bind(this), 1000);
  }

  stop() {
    this.counting = false;
    this.setState(myState);
    window.clearInterval(this.timer);
  }

  componentWillMount() {
    this.reset();
  }

  render() {
    const timeStyle = {
      padding: '5px 5px 15px 5px'
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
          <button style={buttonStyle} disabled={this.state.counting} ref='reset' onClick={this.reset.bind(this)}>Reset</button>
          <button style={buttonStyle} disabled={this.state.counting} ref='start' onClick={this.start.bind(this)}>Start</button>
          <button style={buttonStyle} disabled={!this.state.counting} ref='stop' onClick={this.stop.bind(this)}>Stop</button>
        </div>
      </div>
    );
  }
}