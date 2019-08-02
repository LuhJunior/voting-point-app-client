import React, { useState } from 'react';
import './styles.css';

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  return(
    <div className="container">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form">
          <div className="input-container">
            <label>Matricula</label>
            <input type="text" />
          </div>
          <div className="input-container">
            <label>Senha</label>
            <input type="password" />
          </div>
          <div className="button-container">
            <button className="button-style">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
