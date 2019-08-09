import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoutes from './PrivateRoutes';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/" component={PrivateRoutes} />
    </Switch>
  </Router>
);

export default Routes;
