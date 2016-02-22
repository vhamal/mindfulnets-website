import React from 'react';
import Radium from 'radium';
import bellFile from './bell.wav';

var bell = new Audio(bellFile);
const initialTime = 5;

@Radium
export default class Timer extends React.Component {

  decrementAndCheck() {
    this.setState({remainingSeconds: --this.state.remainingSeconds});

    if(this.state.remainingSeconds <= 0) {
      this.stop();
      bell.play();
    }
  }

  reset() {
    this.setState({remainingSeconds: initialTime});
    this.stop();
  }

  start() {
    this.setState({counting: true});
    this.timer = window.setInterval(function () {
      this.decrementAndCheck();
    }.bind(this), 1000);
  }

  stop() {
    this.setState({counting: false});
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
          <button style={buttonStyle}
            disabled={this.state.remainingSeconds == initialTime}
            ref='reset'
            onClick={this.reset.bind(this)}>
              Reset
          </button>
          <button style={buttonStyle}
            disabled={this.state.counting || this.state.remainingSeconds == 0}
            ref='start'
            onClick={this.start.bind(this)}>
              Start
          </button>
          <button style={buttonStyle}
            disabled={!this.state.counting}
            ref='stop'
            onClick={this.stop.bind(this)}>
              Stop
          </button>
        </div>
      </div>
    );
  }
}