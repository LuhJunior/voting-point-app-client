import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoutes from './PrivateRoutes';

const Routes = () => (
  <Router>
    <Route path="/" exact component={Login} />
    <PrivateRoutes />
  </Router>
);

export default Routes;
