import React, { useState } from 'react';
import './styles.css';

const Login = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  return(
    <div className="container">
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div>
            <label>Matricula</label>
            <input type="text" />
          </div>
          <div>
            <label>Senha</label>
            <input type="password" />
          </div>
          <div>
            <button>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
