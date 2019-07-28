import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard } from './component/dashboard';
import { Navigation } from './component/navigation';

function App() {
  return (
    <Router>
      <Switch>
        <Navigation>
          <Route exact path='/' component={Dashboard} />
        </Navigation>
      </Switch>
    </Router>
  );
}

export default App;
