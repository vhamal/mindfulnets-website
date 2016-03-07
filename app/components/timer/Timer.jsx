import React from 'react';
import { Button } from 'react-bootstrap';
import EventBus from 'vertx3-eventbus-client';
import practices from '../practices';

var eb = new EventBus('http://localhost:3001/eventbus');
var bell = new Audio(require('./bell.wav'));
const durationMinutes = [.1, 5, 10, 15, 20, 30, 45, 60];

export default class Timer extends React.Component {

  reset() {
    practices.put({
      totalSeconds: this.state.totalSeconds,
      remainingSeconds: this.state.totalSeconds,
      started: false
    });
  }

  startPause() {
    practices.put({
      totalSeconds: this.state.totalSeconds,
      remainingSeconds: this.state.remainingSeconds,
      started: !this.state.started
    });
  }

  setTotalSeconds(totalSeconds) {
    practices.put({
      totalSeconds,
      remainingSeconds: totalSeconds
    });
  }

  handleTotalSeconds(error, message) {
    this.setState({totalSeconds: message.body});
  }

  handleRemainingSeconds(error, message) {
    const remainingSeconds = message.body;
    this.setState({ remainingSeconds });
    if(remainingSeconds === 0) {
      bell.play();
    }
  }

  handleStarted(error, message) {
    this.setState({started: message.body});
  }

  componentWillMount() {
    this.setState({
      totalSeconds: durationMinutes[0]*60,
      remainingSeconds: durationMinutes[0]*60,
      started: false
    });

    // TODO socket should be able to reconnect when backend is restarted
    eb.onopen = () => {
      eb.registerHandler('timer.totalSeconds', this.handleTotalSeconds.bind(this));
      eb.registerHandler('timer.remainingSeconds', this.handleRemainingSeconds.bind(this));
      eb.registerHandler('timer.started', this.handleStarted.bind(this));
    };
  }

  componentDidMount() {
    this.reset();
  }

  render() {
    var durationButtons = durationMinutes.map(d =>
      <Button
        disabled={this.state.remainingSeconds == d*60 || this.state.started}
        key={'duration' + d}
        onClick={this.setTotalSeconds.bind(this, d*60)}>
        {d} min
      </Button>
    );

    return (
      <div>
        <div>{this.state.remainingSeconds} / {this.state.totalSeconds} s</div>
        <div>started: {`${this.state.started}`}</div>
        <div>
          <Button
            disabled={this.state.remainingSeconds == this.state.totalSeconds
              && !this.state.started}
              onClick={this.reset.bind(this)}>
              Reset
          </Button>
          <Button
            disabled={this.state.remainingSeconds == 0}
            onClick={this.startPause.bind(this)}>
              {this.state.started ? "Pause" : "Start"}
          </Button>
          {durationButtons}
        </div>
      </div>
    );
  }
}