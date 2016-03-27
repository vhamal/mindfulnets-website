import * as React from "react";
import {Button, ButtonGroup, PageHeader, ProgressBar} from "react-bootstrap";
import {reset, startPause} from "./practiceLib";
import eventBus from "../../lib/eventBus";
import "./Practice.css";

const bell = new Audio(require('./bell.wav'));
const durationMinutes = [.1, 5, 10, 15, 20, 30, 45, 60];

export default class Practice extends React.Component {

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
    eventBus.registerHandlersOnOpen(() => {
      eventBus.registerHandler('app.practice.totalSeconds', this.handleTotalSeconds.bind(this));
      eventBus.registerHandler('app.practice.remainingSeconds', this.handleRemainingSeconds.bind(this));
      eventBus.registerHandler('app.practice.started', this.handleStarted.bind(this));
    });
  }

  componentDidMount() {
    // TODO shouldn't reset if a practice is already running in the backend
    reset(this.state.totalSeconds);
  }

  render() {
    var durationButtons = durationMinutes.map(d =>
      <Button
        disabled={this.state.remainingSeconds == d*60 || this.state.started}
        key={'duration' + d}
        onClick={reset(d*60)}>
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
              onClick={reset(this.state.totalSeconds)}>
              Reset
          </Button>
          <Button
            disabled={this.state.remainingSeconds == 0}
            onClick={startPause(this.state.totalSeconds, this.state.remainingSeconds, !this.state.started)}>
              {this.state.started ? "Pause" : "Start"}
          </Button>
          {durationButtons}
        </ButtonGroup>
      </div>
    );
  }
}
