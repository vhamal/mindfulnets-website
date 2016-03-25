import * as React from "react";
import NavBar from "./../navbar/NavBar";
import Timer from "./../timer/Timer";
import "./MainFrame.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="MainFrame">
        <NavBar />
        <Timer />
      </div>
    );
  }
}
