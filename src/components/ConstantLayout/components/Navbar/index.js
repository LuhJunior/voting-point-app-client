import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './style.css';

const Navbar = ({ nome, history }) => {
  const { location: { pathname } } = history;

  const colorBg = (url) => {
    if (url === pathname) return '#FF9800';
    return 'transparent';
  }

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    history.push('/');
  }

  return (
    <div className="nav-content">
      <div className="info-container">
        <span>Olá, {nome}</span>
      </div>
      <hr />
      <nav>
        <Link style={{ backgroundColor: colorBg('/home') }} to="/home">Home</Link>
        <Link style={{ backgroundColor: colorBg('/cadastrar_usuario') }} to="/cadastrar_usuario">Cadastar Usuário</Link>
        <Link style={{ backgroundColor: colorBg('/cadastrar_reuniao') }} to="/cadastrar_reuniao">Cadastrar Reunião</Link>
        <Link style={{ backgroundColor: colorBg('/reuniao') }} to="/reuniao">Reunião</Link>
        <a onClick={logout}>Sair</a>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
