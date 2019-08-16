import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import ConstantLayout from '../containers/ConstantLayout';
import Home from '../pages/Home';
import CadastrarUsuario from '../pages/CadastrarUser';
import CadastrarReuniao from '../pages/CadastrarReuniao';
import Reuniao from '../pages/Reuniao';

const isLoggedIn = sessionStorage.getItem('@user_token');

const Routes = () => (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/cadastrar_usuario" component={CadastrarUsuario} />
    <Route path="/cadastrar_reuniao" component={CadastrarReuniao} />
    <Route path="/reuniao" component={Reuniao} />
  </Switch>
);

const PrivateRoutes = () => isLoggedIn ? (
  <ConstantLayout
    routes={Routes}  
  />
) : <Redirect to="/" />;

export default PrivateRoutes;
