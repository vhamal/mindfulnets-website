import * as React from "react";
import Navigation from "../navigation/Navigation";
import Timer from "../timer/Timer";
import UserList from "../userList/UserList";
import "./MainFrame.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="MainFrame">
        <Navigation />
        <UserList />
        <Timer />
      </div>
    );
  }
}
