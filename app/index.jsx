import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<App />, app);
}
