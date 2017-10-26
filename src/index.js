/* eslint-disable no-console */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// import './styles/jquery.min.js';
// import './styles/bootstrap-select.min.css';
// import './styles/bootstrap.min.js';
// import './styles/bootstrap-select.min.js';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


render(
  <Router history={browserHistory} routes = {routes} />,
  document.getElementById('app')
);
