import * as React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap";

const app = document.createElement('div');

document.body.appendChild(app);

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
), app);
