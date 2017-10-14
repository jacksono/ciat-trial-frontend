import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import HomePage from './components/home/HomePage'
import ResultsPage from './components/search/results/ResultsPage'


export default (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/search" component={ResultsPage} />
      <Route path="*" component={HomePage} />
    </Route>
  );
