import * as React from "react";
import Navigation from "../navigation/Navigation";
import Practice from "../practice/Practice";
import UserList from "../user/UserList";
import "./MainFrame.css";

export default class MainFrame extends React.Component {
  render() {
    return (
      <div className="MainFrame">
        <Navigation />
        <UserList />
        <Practice />
      </div>
    );
  }
}
