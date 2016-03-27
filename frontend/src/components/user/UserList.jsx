import * as React from "react";
import eventBus from "../../lib/eventBus";
import {getUsers} from "./userLib";
import "./UserList.css";

export default class UserInfo extends React.Component {
  handleNewUser(error, message) {
    this.setState({ users: this.state.users.concat([JSON.parse(message.body)]) });
  }

  componentWillMount() {
    this.setState({ users: [] });

    getUsers()
      .then(users => this.setState({users}));

    eventBus.registerHandlersOnOpen(() => {
      eventBus.registerHandler('app.users.new', this.handleNewUser.bind(this));
    });
  }

  render() {
    return (
      <div className="UserList">
        {this.state.users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    )
  }
}
