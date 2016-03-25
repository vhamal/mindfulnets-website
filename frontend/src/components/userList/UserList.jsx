import * as React from "react";
import eventBus from "../../lib/eventBus";
import "./UserList.css";

export default class UserInfo extends React.Component {
  handleUsers(error, message) {
    this.setState({ users: message.body });
  }

  componentWillMount() {
    this.setState({ users: [] });

    eventBus.onopen = () => {
      eventBus.registerHandler('app.users', this.handleUsers.bind(this));
    };
  }

  render() {
    return (
      <div className="UserList">
        {this.state.users.map(user => <div>{user}</div>)}
      </div>
    )
  }
}
