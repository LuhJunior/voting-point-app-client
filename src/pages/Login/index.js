import React, { useState } from 'react';
import { PersonRounded, LockRounded } from '@material-ui/icons';
import { withRouter, Redirect } from 'react-router-dom';

import Input from '../../components/Input';
import { withSnackbarBottom } from '../../components/SnackbarBottom';

import api from '../../services/api';

import './style.css';


const Login = ({ openSnackbar, history }) => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const isLoggedIn = sessionStorage.getItem('@user_token');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'matricula') setMatricula(value);
    else if (name === 'senha') setSenha(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (matricula !== '' && senha !== '') {
      try {
        const resposta = await api.post('/sign_in', { matricula, senha });
        const {
          data: {
            jwt,
            id,
            nome,
            tipo,
          },
        } = resposta.data;
        sessionStorage.setItem('@user_token', jwt);
        sessionStorage.setItem('@user_id', id);
        sessionStorage.setItem('@user_name', nome);
        sessionStorage.setItem('@user_type', tipo);
        history.push('/home');
        // console.log(resposta);
      } catch (e) {
        if (e.response.data.data.code === 400) openSnackbar('Matricula e/ou senha inválida(s)');
        else openSnackbar('Ocorreu um erro');
      }
    } else {
      openSnackbar('Preencha todos os campos');
    }
  };

  return (
    isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
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
                    <button type="submit" className="button-style" onClick={handleSubmit}>
                      ENTRAR
                    </button>
                  </div>
                </form>
                <div className="span-container">
                  <span>Esqueci minha senha</span>
                </div>
                <div className="line-container">
                  <hr />
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="footer">
          <span>Copyright © Cândido Júnior 2019. All Rights Reserved</span>
        </div>
      </div>
    )
  );
};

export default withRouter(withSnackbarBottom(Login));
