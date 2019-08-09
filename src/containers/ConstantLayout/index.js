import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';

import './style.css';

export default ({ routes: Routes }) => (
  <div className="app-container">
    <div className="nav-container">
      <Navbar />  
    </div>
    <div className="content-container">
      <Header />
      <div className="content">
        <Routes />
      </div>
    </div>
  </div>
);
