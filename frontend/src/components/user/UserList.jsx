import * as React from "react";
import eventBus from "../../lib/eventBus";
import {getUsers} from "./userLib";
import "./UserList.css";

export default class UserInfo extends React.Component {
  handleUsers(error, message) {
    this.setState({ users: message.body });
  }

  componentWillMount() {
    this.setState({ users: [] });

    getUsers()
      .then(users => this.setState({users}));

    eventBus.onopen = () => {
      eventBus.registerHandler('app.users', this.handleUsers.bind(this));
    };
  }

  render() {
    return (
      <div className="UserList">
        {this.state.users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    )
  }
}
