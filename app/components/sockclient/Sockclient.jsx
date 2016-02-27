import React from 'react';
import EventBus from 'vertx3-eventbus-client';

var eb = new EventBus('http://localhost:3001/eventbus');

export default class Timer extends React.Component {

  componentWillMount() {
    this.setState({msg: 'Socket messages will show up here'});
    // TODO socket should be able to reconnect when backend is restarted
    eb.onopen = () => {
      eb.registerHandler('notif', (error, message) => {
        this.setState({msg: message.body});
      });
    };
  }

  render() {
    return <div><br/><span>{this.state.msg}</span></div>;
  }
}