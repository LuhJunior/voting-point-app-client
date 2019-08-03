import React, { useState } from 'react';
import { Person, Lock } from '@material-ui/icons';

import api from '../../services/api';

import './styles.css';
import { async } from 'q';

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleChange = ({ target: { name, value }}) => {
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
        console.log(resposta);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-content-container">
          <div className="icon-container">
            <Person className="icon-style" />
          </div>
          <h2 className="login-title">Login</h2>
          <div className="login-form">
            <form>
              <div className="input-container">
                <Person />
                <input
                  name="matricula"
                  type="text"
                  placeholder="Matricula"
                  value={matricula}
                  maxLength="12"
                  onChange={handleChange}
                />
              </div>
              <div className="input-container">
                <Lock />
                <input
                  name="senha"
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  maxLength="16"
                  onChange={handleChange}
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
        </div>
      </div>
      <div className="footer">
        <label>by Cândido Júnior 2019</label>
      </div>
    </div>
  );
};

export default Login;
