import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { EditMovie, Home } from './movie';
import PageNotFound from './PageNotFound';

import './App.scss';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <Router>
        <div className="route-wrapper">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/search/:query?" component={Home} exact />
            <Route path="/movie/:id" component={EditMovie} />
            <Route path="*" component={PageNotFound} exact />
          </Switch>
        </div>
      </Router>
      <AppFooter />
    </div>
  );
}

export default App;
