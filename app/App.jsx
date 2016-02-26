import React from 'react';
import Sockclient from './components/sockclient/Sockclient.jsx';
import Timer from './components/timer/Timer.jsx';

export default () => {
  return (
    <div>
      <Timer />
      <Sockclient />
    </div>
  );
}