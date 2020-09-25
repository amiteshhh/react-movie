import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { EditMovie, Home } from './movie';

import './App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <Router>
        <div className="route-wrapper">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/movie/:id">
              <EditMovie />
            </Route>
          </Switch>
        </div>
      </Router>
      <AppFooter />
    </div>
  );
}

export default App;
