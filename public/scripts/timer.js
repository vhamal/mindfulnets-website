
var TimerBox = React.createClass({
  render: function() {
    return (
      <div className="timerBox">
        <h1>Timer</h1>
      </div>
    );
  }
});

ReactDOM.render(
  <TimerBox url="/api/meditations" pollInterval={2000} />,
  document.getElementById('content')
);
