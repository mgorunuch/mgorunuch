import React from 'react';
import ReactDOM from 'react-dom';
import "flexboxgrid/css/flexboxgrid.min.css";
import './index.css';
import * as serviceWorker from './serviceWorker';
import RouterContainer from "./service/router/router";
import ReactGA from 'react-ga';

if (process.env.NODE_ENV === 'production') {
  const trackingId = process.env.GOOGLE_ANALYTICS_TRACK_ID; // Replace with your Google Analytics tracking ID
  ReactGA.initialize(trackingId);
  ReactGA.set({
    stage: process.env.NODE_ENV,
  });
}

ReactDOM.render(<RouterContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
