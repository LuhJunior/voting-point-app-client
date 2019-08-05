import React from 'react';
import { Route, Redirect } from "react-router-dom";

import ConstantLayout from '../components/ConstantLayout';
import CadastrarUsuario from '../pages/CadastrarUser';

const isLoggedIn = sessionStorage.getItem('@user_token') !== null;

const Routes = () => (
  <>
    <Route path="/home" component={() => (<div>bem vindo</div>)} />
    <Route path="/cadastrar_usuario" component={CadastrarUsuario} />
  </>
);

const PrivateRoutes = () => isLoggedIn ? (
  <ConstantLayout
    routes={Routes}  
  />
) : <Redirect to="/" />;

export default PrivateRoutes;
