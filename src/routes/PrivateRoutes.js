import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import ConstantLayout from '../containers/ConstantLayout';
import Home from '../pages/Home';
import CadastrarUsuario from '../pages/CadastrarUser';
import CadastrarReuniao from '../pages/CadastrarReuniao';
import Reunioes from '../pages/Reunioes';
import Reuniao from '../pages/Reuniao';


const Routes = () => (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/cadastrar_usuario" component={CadastrarUsuario} />
    <Route path="/cadastrar_reuniao" component={CadastrarReuniao} />
    <Route path="/reunioes" component={Reunioes} />
    <Route path="/reuniao" component={Reuniao} />
  </Switch>
);



const PrivateRoutes = () => {
  const isLoggedIn = sessionStorage.getItem('@user_token');
  return isLoggedIn ? <ConstantLayout routes={Routes} /> : <Redirect to="/" />;
};

export default PrivateRoutes;
