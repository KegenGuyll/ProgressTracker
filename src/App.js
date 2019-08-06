import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard } from './component/dashboard';
import Navigation from './component/navigation';
import { Explore } from './component/explore';
import { Friends } from './component/friends';
import { Progress } from './component/progress';
import { Settings } from './component/settings';
import 'react-toastify/dist/ReactToastify.css';

const App = props => {
  return (
    <Router>
      <Navigation user={props.user}>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/friends' component={Friends} />
          <Route exact path='/progress' component={Progress} />
          <Route exact path='/settings' component={Settings} />
        </Switch>
      </Navigation>
    </Router>
  );
};

export default App;
