import React from 'react';
import './style.css';
export default ({ Icon, className, ...props}) => Icon ? (
  <div className="input-icon-container">
    <Icon />
    <input className={className} {...props} />
  </div>) : (<input className={`input-no-icon ${className}`} {...props} />);
