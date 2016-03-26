import * as React from "react";
import {Button, ButtonGroup, PageHeader, ProgressBar} from "react-bootstrap";
import {updatePractice} from "./practiceLib";
import eventBus from "../../lib/eventBus";
import "./Practice.css";

const bell = new Audio(require('./bell.wav'));
const durationMinutes = [.1, 5, 10, 15, 20, 30, 45, 60];

export default class Practice extends React.Component {

  reset() {
    updatePractice({
      totalSeconds: this.state.totalSeconds,
      remainingSeconds: this.state.totalSeconds,
      started: false
    });
  }

  startPause() {
    updatePractice({
      totalSeconds: this.state.totalSeconds,
      remainingSeconds: this.state.remainingSeconds,
      started: !this.state.started
    });
  }

  setTotalSeconds(totalSeconds) {
    updatePractice({
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
    eventBus.onopen = () => {
     eventBus.registerHandler('app.practice.totalSeconds', this.handleTotalSeconds.bind(this));
     eventBus.registerHandler('app.practice.remainingSeconds', this.handleRemainingSeconds.bind(this));
     eventBus.registerHandler('app.practice.started', this.handleStarted.bind(this));
    };
  }

  componentDidMount() {
    // TODO shouldn't reset if a practice is already running in the backend
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
      <div className='Practice'>
        <PageHeader>
          <ProgressBar now={this.state.remainingSeconds*100.0/this.state.totalSeconds} />
          {this.state.remainingSeconds} / {this.state.totalSeconds} s
          <p><small>started: {`${this.state.started}`}</small></p>
        </PageHeader>
        <ButtonGroup>
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
        </ButtonGroup>
      </div>
    );
  }
}
