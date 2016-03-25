import * as React from "react";
import NavBar from "../navbar/NavBar";
import Timer from "../timer/Timer";
import UserList from "../userList/UserList";
import "./MainFrame.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="MainFrame">
        <NavBar />
        <UserList />
        <Timer />
      </div>
    );
  }
}
