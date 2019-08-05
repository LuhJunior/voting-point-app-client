import React, { useState } from 'react';
import { PersonRounded, LockRounded } from '@material-ui/icons';
import { withRouter } from "react-router-dom";

import Input from '../../components/Input';
import { withSnackbarBottom } from '../../components/SnackbarBottom';

import api from '../../services/api';

import './style.css';

const Login = ({ openSnackbar, history }) => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'matricula') setMatricula(value);
    else if (name === 'senha') setSenha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (matricula !== '' && senha !== '') {
      try {
        const resposta = await api.post('sign_in', { matricula, senha });
        const { data } = resposta.data;
        sessionStorage.setItem('@user_token', data);
        history.push('/home');
        console.log(resposta);
      } catch (err) {
        openSnackbar('Ocorreu um erro');
        console.log(err);
      }
    } else {
      openSnackbar('Preencha todos os campos');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-content-container">
          <div className="icon-container">
            <PersonRounded className="icon-style" />
          </div>
          <main>
            <h2 className="login-title">Login</h2>
            <div className="login-form">
              <form>
                <div className="input-container">
                  <Input
                    name="matricula"
                    type="text"
                    placeholder="Matricula"
                    value={matricula}
                    maxLength="12"
                    onChange={handleChange}
                    Icon={PersonRounded}
                  />
                </div>
                <div className="input-container">
                  <Input
                    name="senha"
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    maxLength="16"
                    onChange={handleChange}
                    Icon={LockRounded}
                  />
                </div>
                <div className="button-container">
                  <button className="button-style" onClick={handleSubmit}>
                    ENTRAR
                  </button>
                </div>
              </form>
              <div className="label-container">
                <label>Esqueci minha senha</label>
              </div>
              <div className="line-container">
                <hr />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="footer">
        <label>Copyright © Cândido Júnior 2019. All Rights Reserved</label>
      </div>
    </div>
  );
};

export default withRouter(withSnackbarBottom(Login));
