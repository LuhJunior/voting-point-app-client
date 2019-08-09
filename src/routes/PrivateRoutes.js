import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import ConstantLayout from '../containers/ConstantLayout';
import CadastrarUsuario from '../pages/CadastrarUser';
import CadastrarReuniao from '../pages/CadastrarReuniao';

const isLoggedIn = (sessionStorage.getItem('@user_token') !== null);

const Routes = () => (
  <Switch>
    <Route path="/home" component={() => (<div>bem vindo</div>)} />
    <Route path="/cadastrar_usuario" component={CadastrarUsuario} />
    <Route path="/cadastrar_reuniao" component={CadastrarReuniao} />
  </Switch>
);

const PrivateRoutes = () => isLoggedIn ? (
  <ConstantLayout
    routes={Routes}  
  />
) : <Redirect to="/" />;

export default PrivateRoutes;
