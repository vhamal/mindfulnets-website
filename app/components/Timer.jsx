import React from 'react';

export default class Timer extends React.Component {
	checkTime() {
		this.setState({ remainingSeconds: this.remainingSeconds-- });

    if(this.remainingSeconds < 0) {
      window.clearInterval(this.timer);
    }
	}

	componentWillMount() {
    this.remainingSeconds = 10;
    this.checkTime();
	}

	componentDidMount() {
		this.timer = window.setInterval(function () {
			this.checkTime();
		}.bind(this), 1000);
	}

	render() {
		return <div>{this.state.remainingSeconds}</div>;
	}
}