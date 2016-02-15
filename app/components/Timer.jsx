import React from 'react';
import moment from 'moment';

export default class Timer extends React.Component {
	setTime() {
		this.setState({
			moment: moment().format('MMMM Do YYYY, HH:mm:ss')
		});
	}

	componentWillMount() {
    this.setTime();
	}

	componentDidMount() {
		window.setInterval(function () {
			this.setTime();
		}.bind(this), 1000);
	}

	render() {
		return <div>{this.state.moment}</div>;
	}
}